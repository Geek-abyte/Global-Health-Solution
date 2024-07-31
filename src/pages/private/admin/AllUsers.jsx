// UsersPage.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiEdit,
  FiTrash2,
  FiEye,
  FiChevronDown,
  FiChevronUp,
  FiFilter,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import axiosInstance from "../../../utils/axiosConfig";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("firstName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [filters, setFilters] = useState({
    role: "",
    country: "",
    joinedDate: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axiosInstance.get("/admin/get-users");
    const { data } = response;
    setUsers(data);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    setCurrentPage(1);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filters.role ? user.role === filters.role : true;
    const matchesCountry = filters.country
      ? user.country.toLowerCase().includes(filters.country.toLowerCase())
      : true;
    const matchesJoinedDate = filters.joinedDate
      ? new Date(user.createdAt)
          .toLocaleDateString()
          .includes(filters.joinedDate)
      : true;

    return matchesSearch && matchesRole && matchesCountry && matchesJoinedDate;
  });

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const UserRow = ({ user }) => (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white border-b hover:bg-gray-50"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full"
            src={user.profileImage || "https://via.placeholder.com/40"}
            alt=""
          />
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{`${user.firstName} ${user.lastName}`}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            user.role === "admin"
              ? "bg-red-100 text-red-800"
              : user.role === "specialist"
              ? "bg-green-100 text-green-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {user.role}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.country}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link
          to={`/admin/users/${user._id}`}
          className="text-indigo-600 hover:text-indigo-900 mr-3"
        >
          <FiEye />
        </Link>
        <Link
          to={`/admin/users/${user._id}/edit`}
          className="text-yellow-600 hover:text-yellow-900 mr-3"
        >
          <FiEdit />
        </Link>
        <button
          onClick={() => handleDeleteUser(user._id)}
          className="text-red-600 hover:text-red-900"
        >
          <FiTrash2 />
        </button>
      </td>
    </motion.tr>
  );

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // Replace with your actual API call
      await fetch(`/api/users/${userId}`, { method: "DELETE" });
      fetchUsers();
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">User Management</h1>
      <div className="mb-4 flex flex-wrap justify-between items-center">
        <div className="relative mb-2 sm:mb-0">
          <input
            type="text"
            placeholder="Search users..."
            className="w-64 pl-10 pr-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={handleSearch}
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <div className="flex flex-wrap items-center">
          <select
            name="role"
            value={filters.role}
            onChange={handleFilterChange}
            className="mr-2 mb-2 sm:mb-0 px-3 py-2 border rounded-md"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="specialist">Specialist</option>
            <option value="user">User</option>
          </select>
          <input
            type="text"
            name="country"
            placeholder="Filter by country"
            value={filters.country}
            onChange={handleFilterChange}
            className="mr-2 mb-2 sm:mb-0 px-3 py-2 border rounded-md"
          />
          <input
            type="text"
            name="joinedDate"
            placeholder="Filter by joined date"
            value={filters.joinedDate}
            onChange={handleFilterChange}
            className="mr-2 mb-2 sm:mb-0 px-3 py-2 border rounded-md"
          />
          <FiFilter className="text-gray-400" />
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Role", "Country", "Joined Date", "Actions"].map(
                (header, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(header.toLowerCase())}
                  >
                    <div className="flex items-center">
                      {header}
                      {sortField === header.toLowerCase() &&
                        (sortDirection === "asc" ? (
                          <FiChevronUp className="ml-1" />
                        ) : (
                          <FiChevronDown className="ml-1" />
                        ))}
                    </div>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.map((user) => (
              <UserRow key={user._id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          Showing {indexOfFirstUser + 1} to{" "}
          {Math.min(indexOfLastUser, sortedUsers.length)} of{" "}
          {sortedUsers.length} users
        </div>
        <div>
          {Array.from({
            length: Math.ceil(sortedUsers.length / usersPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500 hover:bg-blue-100"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
