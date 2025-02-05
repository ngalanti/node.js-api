import api from "./api";


export const createExpenses = async (payload) => {
  try {
    const { userId } = payload;
    const { data } = await api.post(`/add-expense/${userId}`, payload);
    return data; // returns { message, expense } if server code is returning it
  } catch (error) {
    const message =
      error.response?.data.message ||
      "An error occurred while creating the expense. Please try again.";
    throw new Error(message);
  }
};


export const getExpenses = async (userId) => {
  try {
    const { data } = await api.get(`/get-expense/${userId}`);
    return data; 
  } catch (error) {
    const message =
      error.response?.data.message ||
      "An error occurred while fetching the expenses. Please try again.";
    throw new Error(message);
  }
};


export const updateExpense = async (expenseId, payload) => {
  try {
    const { userId } = payload;
    // The route requires userId and expenseId in the URL
    const { data } = await api.patch(`/update-expense/${userId}/${expenseId}`, payload);
    return data; // returns { message, expense } if server code is returning it
  } catch (error) {
    const message =
      error.response?.data.message ||
      "An error occurred while updating the expense. Please try again.";
    throw new Error(message);
  }
};



export const deleteExpense = async (userId, expenseId) => {
  try {
    const { data } = await api.delete(`/delete-expense/${userId}/${expenseId}`);
    return data; 
  } catch (error) {
    const message =
      error.response?.data.message ||
      "An error occurred while deleting the expense. Please try again.";
    throw new Error(message);
  }
};


export const getTotalExpenses = async (userId) => {
  try {
    const { data } = await api.get(`/get-total-expenses/${userId}`);
    return data; 
  } catch (error) {
    const message =
      error.response?.data.message ||
      "An error occurred while fetching the total expenses. Please try again.";
    throw new Error(message);
  }
};
