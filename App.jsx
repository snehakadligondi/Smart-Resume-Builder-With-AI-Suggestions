import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [resume, setResume] = useState({
    fullName: "",
    email: "",
    phone: "",
    skills: "",
    education: "",
    experience: "",
  });

  const [allResumes, setAllResumes] = useState([]);
  const [suggestion, setSuggestion] = useState("");

  const handleChange = (e) => {
    setResume({ ...resume, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/resume/save", resume);
      alert("✅ Resume Saved Successfully!");
      setResume({
        fullName: "",
        email: "",
        phone: "",
        skills: "",
        education: "",
        experience: "",
      });
      fetchAllResumes();
      generateSuggestion();
    } catch (error) {
      console.error("Error saving resume:", error);
      alert("❌ Failed to save resume!");
    }
  };

  const fetchAllResumes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/resume/all");
      setAllResumes(response.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  // 🧠 Simple AI Suggestion Logic
  const generateSuggestion = () => {
    if (resume.skills.toLowerCase().includes("java")) {
      setSuggestion("💡 Suggestion: Add Spring Boot or Hibernate for a stronger Java profile!");
    } else if (resume.skills.toLowerCase().includes("python")) {
      setSuggestion("💡 Suggestion: Include Machine Learning or Django for Python-based roles!");
    } else if (resume.skills === "") {
      setSuggestion("💡 Suggestion: Add at least 3 key skills to make your resume more effective!");
    } else {
      setSuggestion("💡 Suggestion: Include measurable achievements or project links for more impact!");
    }
  };

  // 🧾 Download Resume as .txt
  const handleDownload = (r) => {
    const content = `
Full Name: ${r.fullName}
Email: ${r.email}
Phone: ${r.phone}
Education: ${r.education}
Experience: ${r.experience}
Skills: ${r.skills}
`;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${r.fullName.replace(/\s+/g, "_")}_Resume.txt`;
    link.click();
  };

  return (
    <div style={{ margin: "40px auto", width: "400px", textAlign: "center" }}>
      <h2>🤖 Smart Resume Builder with AI Suggestions</h2>

      <form onSubmit={handleSubmit}>
        <input name="fullName" placeholder="Full Name" value={resume.fullName} onChange={handleChange} /><br />
        <input name="email" placeholder="Email" value={resume.email} onChange={handleChange} /><br />
        <input name="phone" placeholder="Phone" value={resume.phone} onChange={handleChange} /><br />
        <input name="skills" placeholder="Skills" value={resume.skills} onChange={handleChange} /><br />
        <input name="education" placeholder="Education" value={resume.education} onChange={handleChange} /><br />
        <input name="experience" placeholder="Experience" value={resume.experience} onChange={handleChange} /><br />
        <button type="submit">Save Resume</button>
      </form>

      {suggestion && (
        <p style={{ background: "#f2f2f2", padding: "10px", marginTop: "10px", borderRadius: "8px" }}>
          {suggestion}
        </p>
      )}

      <hr />
      <h3>📋 All Saved Resumes</h3>
      {allResumes.length === 0 ? (
        <p>No resumes found.</p>
      ) : (
        <ul style={{ textAlign: "left" }}>
          {allResumes.map((r) => (
            <li key={r.id}>
              <b>{r.fullName}</b> ({r.email}) <br />
              📞 {r.phone} <br />
              🎓 {r.education} <br />
              💼 {r.experience} <br />
              🧠 {r.skills} <br />
              <button onClick={() => handleDownload(r)}>⬇️ Download</button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
