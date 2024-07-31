import axiosInstance from "./axiosConfig";

export const checkUnapprovedUsers = async () => {
  try {
    const response = await axiosInstance.get("/admin/check-unapproved");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSpecialists = async () => {
  try {
    const response = await axiosInstance.get("/admin/unapproved-specialists");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
