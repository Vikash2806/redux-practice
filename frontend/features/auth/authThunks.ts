import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "@/services/authApi";
import type {
  AuthResponse,
  LoginPayload,
  SignupPayload,
} from "./authTypes";

// 🔹 LOGIN
export const loginUserAsync = createAsyncThunk<
  AuthResponse,
  LoginPayload
>("auth/loginUser", async (payload) => {
  const data = await loginUser(payload);
  return data;
});

// 🔹 SIGNUP
export const signupUserAsync = createAsyncThunk<
  AuthResponse,
  SignupPayload
>("auth/signupUser", async (payload) => {
  const data = await signupUser(payload);
  return data;
});