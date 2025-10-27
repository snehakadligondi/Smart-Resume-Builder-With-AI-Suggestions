import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function ResumeForm({ onSaved }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const res = await axios.post("http://localhost:8080/api/resumes", data);
    onSaved(res.data);
    alert("✅ Resume saved successfully!");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <input {...register("name")} placeholder="Full Name" required />
      <input {...register("email")} placeholder="Email" required />
      <textarea {...register("summary")} placeholder="Summary" rows="3" />
      <textarea {...register("experience")} placeholder="Experience" rows="3" />
      <textarea {...register("education")} placeholder="Education" rows="3" />
      <textarea {...register("skills")} placeholder="Skills" rows="3" />
      <button type="submit">Save Resume</button>
    </form>
  );
}
