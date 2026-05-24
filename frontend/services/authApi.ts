import type {
  AuthResponse,
  LoginPayload,
  SignupPayload,
} from "@/features/auth/authTypes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'null--void',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  return response.json();
}

export async function signupUser(
  payload: SignupPayload
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'null--void',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Signup failed");
  }

  return response.json();
}