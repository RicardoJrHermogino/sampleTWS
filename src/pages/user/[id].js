// pages/user/[id].js
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const UserPage = ({ user }) => {
  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>User Information</h1>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await axios.get(`http://localhost:3000/users/${id}`);
    const user = res.data;

    return {
      props: { user },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { user: null },
    };
  }
}

export default UserPage;
