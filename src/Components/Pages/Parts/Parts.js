import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading";
import Part from "./Part";

const Parts = () => {
  const navigate = useNavigate();

  const {
    data: parts,
    isLoading,
    refetch,
  } = useQuery("parts", () =>
    fetch("http://localhost:5000/parts", {
      method: "GET",
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }

  //   useEffect(() => {
  //     fetch("http://localhost:5000/parts")
  //       .then((res) => res.json())
  //       .then((data) => setParts(data));
  //   }, []);
  return (
    <div className="my-12 px-14 flex items-center justify-center ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 ">
        {parts.map((part) => (
          <Part key={part._id} part={part} refetch={refetch}></Part>
        ))}
      </div>
    </div>
  );
};

export default Parts;