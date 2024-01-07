import axios from "axios";


// Axios Instance for HMS App
export const axiosInstanceHMSApp = axios.create({
  baseURL: "http://localhost:9090",
  timeout: 5000,
});

axiosInstanceHMSApp.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// Axios Instance for Doctor Service
export const axiosInstanceDoctorService = axios.create({
  baseURL: "http://localhost:8300",
  timeout: 3000,
});

axiosInstanceDoctorService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// Axios Instance for User Service
export const axiosInstanceUserService = axios.create({
  baseURL: "http://localhost:8100",
  timeout: 3000,
});

axiosInstanceUserService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// Axios Instance for Patient Service
export const axiosInstancePatientService = axios.create({
  baseURL: "http://localhost:8200",
  timeout: 3000,
});

axiosInstancePatientService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Axios Instance for Pharmaceutical Service
export const axiosInstancePharmaceuticalService = axios.create({
  baseURL: "http://localhost:8400",
  timeout: 3000,
});

axiosInstancePharmaceuticalService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});



// Axios Instance for Appointment Service
export const axiosInstanceAppointmentService = axios.create({
  baseURL: "http://localhost:8500",
  timeout: 3000,
});

axiosInstanceAppointmentService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// Axios Instance for Notification and AlertService
export const axiosInstanceNotificationAlertService = axios.create({
  baseURL: "http://localhost:8390",
  timeout: 5000,
});

axiosInstanceNotificationAlertService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// Axios Instance for Community Portal Service
export const axiosInstanceCommunityPortalService = axios.create({
  baseURL: "http://localhost:8600",
  timeout: 3000,
});

axiosInstanceCommunityPortalService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});



export default axiosInstanceHMSApp;




