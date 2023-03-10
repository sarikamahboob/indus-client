import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading";

const MyProfile = () => {
  const [user, loading] = useAuthState(auth);
  const [isReload, setIsReload] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [userP, setUserP] = useState([]);
  const navigate = useNavigate();
  const email = user.email;

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch(`https://manufacturer-website-indus-server.onrender.com/users?email=${email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  // useEffect(() => {
  //   const email = user.email;

  //   fetch(`https://manufacturer-website-indus-server.onrender.com/user?email=${email}`, {
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUserP(data);
  //     });
  // }, [user, isReload]);

  const onSubmit = (data) => {
    console.log(data);
    const email = user.email;

    fetch(`https://manufacturer-website-indus-server.onrender.com/user/${email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
        reset();
        setIsReload(!isReload);
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8 text-accent font-saira ">
        Your Profile
      </h1>
      <div className="gap-6 flex flex-col md:flex-row lg:flex-row">
        <div class="card w-96 bg-base-100 shadow-xl p-6 ml-6">
          <div class="">
            <h2 class="card-title font-saira text-accent text-2xl font-bold text-center">
              Your Information
            </h2>
            <p className="text-lg font-roboto mt-4">
              <span className="text-accent font-bold">Name:</span>{" "}
              {user.displayName}
            </p>
            <p className="text-lg font-roboto mt-4">
              <span className="text-accent font-bold">Email:</span> {user.email}
            </p>
            {users.map((user) => (
              <div>
                <p className="text-lg font-roboto mt-4">
                  <span className="text-accent font-bold">
                    University/College/School Name:
                  </span>{" "}
                  {user.education}
                </p>
                <p className="text-lg font-roboto mt-4">
                  <span className="text-accent font-bold">Address:</span>{" "}
                  {user.address}
                </p>
                <p className="text-lg font-roboto mt-4">
                  <span className="text-accent font-bold">Phone Number:</span>{" "}
                  {user.number}
                </p>
                <p className="text-lg font-roboto mt-4">
                  <span className="text-accent font-bold">LinkedIn Link:</span>
                  {user.linkedin}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div class="card w-96  shadow-2xl bg-base-100 ml-6">
          <div class="card-body">
            <h2 class="card-title font-saira text-accent text-2xl font-bold text-center">
              Add Info
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="font-roboto">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-accent text-lg font-bold">
                    Name
                  </span>
                </label>
                <input
                  className="input input-bordered w-full max-w-xs"
                  disabled
                  value={user.displayName}
                  {...register("name", {
                    required: true,
                    value: user.displayName,
                  })}
                />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-accent text-lg font-bold">
                    Email
                  </span>
                </label>
                <input
                  className="input input-bordered w-full max-w-xs"
                  disabled
                  value={user.email}
                  {...register("email", {
                    required: true,
                    value: user.email,
                  })}
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-accent text-lg font-bold">
                    University/College/School Name
                  </span>
                </label>
                <input
                  className="input input-bordered w-full max-w-xs"
                  {...register("education", {
                    required: {
                      value: true,
                    },
                  })}
                />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-accent text-lg font-bold">
                    Address
                  </span>
                </label>
                <input
                  className="input input-bordered w-full max-w-xs"
                  {...register("address", {
                    required: {
                      value: true,
                    },
                  })}
                />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-accent text-lg font-bold">
                    Phone Number
                  </span>
                </label>
                <input
                  className="input input-bordered w-full max-w-xs"
                  {...register("number", {
                    required: {
                      value: true,
                    },
                  })}
                />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-accent text-lg font-bold">
                    Linked Profile Link
                  </span>
                </label>
                <input
                  className="input input-bordered w-full max-w-xs"
                  {...register("linkedin", {
                    required: {
                      value: true,
                    },
                  })}
                />
              </div>

              <input
                className="btn btn-primary w-full max-w-xs text-base-100 hover:bg-base-100 hover:border-accent hover:text-accent hover:ease-in-out hover:duration-300 mt-4"
                type="submit"
                value="Add"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
