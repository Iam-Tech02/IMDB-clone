import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const MovieUploadForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [status, setStatus] = useState("");

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("genre", data.genre);
    formData.append("releaseDate", data.releaseDate);
    formData.append("poster", data.poster[0]);
    formData.append("video", data.video[0]);

    try {
      setStatus("Uploading...");
      const response = await axios.post("http://localhost:5000/api/movies", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setStatus("Upload successful!");
      reset();
    } catch (error) {
      setStatus("Upload failed. Please try again.");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black bg-opacity-90 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">🎬 Upload a Movie</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              className="w-full border border-gray-300 p-3 rounded-lg h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Genre */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Genre</label>
            <input
              type="text"
              {...register("genre", { required: "Genre is required" })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>}
          </div>

          {/* Release Date */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Release Date</label>
            <input
              type="date"
              {...register("releaseDate", { required: "Release date is required" })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.releaseDate && <p className="text-red-500 text-sm mt-1">{errors.releaseDate.message}</p>}
          </div>

          {/* Poster */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Poster (Image)</label>
            <input
              type="file"
              accept="image/*"
              {...register("poster", { required: "Poster is required" })}
              className="w-full file:rounded file:border-0 file:bg-blue-600 file:text-white file:px-4 file:py-2 file:cursor-pointer"
            />
            {errors.poster && <p className="text-red-500 text-sm mt-1">{errors.poster.message}</p>}
          </div>

          {/* Video */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Video File</label>
            <input
              type="file"
              accept="video/*"
              {...register("video", { required: "Video file is required" })}
              className="w-full file:rounded file:border-0 file:bg-blue-600 file:text-white file:px-4 file:py-2 file:cursor-pointer"
            />
            {errors.video && <p className="text-red-500 text-sm mt-1">{errors.video.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Upload Movie
          </button>

          {/* Status Message */}
          {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default MovieUploadForm;
