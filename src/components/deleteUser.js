import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DeleteUser() {
  const { id } = useParams();

  useEffect(() => {
    const deleteUser = async () => {
      try {
        const response = await fetch(`https://students-website-records-backend.vercel.app/api/delete/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          console.log("User Deleted Successfully");
        } else {
          console.log("User not Deleted Successfully");
        }
      } catch (error) {
        console.error("Delete error:", error);
      }
    };
    deleteUser();
  }, [id]);

  return (
    <div>
      <h1>User Deleted</h1>
    </div>
  );
}

export default DeleteUser;
