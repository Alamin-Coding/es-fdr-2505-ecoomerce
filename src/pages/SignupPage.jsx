import React, { useState } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import SocialButtons from "../components/auth/SocialButtons";
import UnderlineInput from "../components/auth/UnderlineInput";
import photo from "../assets/signup.png";
// Dummy image - replace with your own
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80";

export default function SignupPage({
  image = photo ||DEFAULT_IMAGE,
  onSubmit,
  onGoogle,
  onEmail,
  loginHref = "/login",
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    onSubmit?.(form);
  };

  return (
    <AuthLayout image={image} imageAlt="Fashion model" title="Create Account">
      <SocialButtons onGoogle={onGoogle} onEmail={onEmail} />

      <form onSubmit={handleSubmit}>
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <UnderlineInput name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
          <UnderlineInput name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
          <UnderlineInput type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
          <UnderlineInput type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
          <UnderlineInput type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <UnderlineInput type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-10 space-y-4 text-center">
          <button
            type="submit"
            className="w-full rounded-lg bg-black py-4 text-sm font-semibold tracking-wide text-white shadow-lg transition hover:bg-neutral-800"
          >
            Create Account
          </button>
          <p className="text-sm tracking-wide text-black">
            Already have an account?{" "}
            <a href={loginHref} className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}