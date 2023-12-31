import React, { useState } from "react";
import "./Card.css";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { toast } from "react-toastify";
const Card = (props) => {
  const { id: courseId, title, image, description } = props.course;
  const { likedCourses, setLikedCourses } = props;
  let initDesc = `${description.slice(0, 100)}`;
  const [desc, setDesc] = useState(initDesc);
  const [readMore, setReadMore] = useState(false);
  function handleLike() {
    // course remove
    if (likedCourses.includes(courseId)) {
      setLikedCourses((prevLikedCourses) =>
        prevLikedCourses.filter((cid) => cid != courseId)
      );
      toast.warn("Course Removed");
    } else {
      // course add when empty
      if (likedCourses == []) setLikedCourses([courseId]);
      // add course when non-empty
      else setLikedCourses([...likedCourses, courseId]);
      toast.success("Liked Course");
    }
  }
  function handleReadMore() {
    setReadMore(!readMore);
    readMore ? setDesc(initDesc) : setDesc(description);
  }
  return (
    <div className="card hover:scale-[1.05] transition-all duration-[.5s] ease-in-out flex flex-col w-[300px] overflow-hidden rounded-md bg-indigo-950 text-slate-100 ">
      {/* image */}
      <div className="relative rounded-sm  w-full ">
        <img src={image.url} alt={image.alt} className="object-cover" />
        {/* like button */}
        <button
          onClick={handleLike}
          className="absolute right-1 bg-custom rounded-full bottom-[-1rem] px-2 py-1 w-[40px] h-[40px]"
        >
          {likedCourses.includes(courseId) ? (
            <FcLike size={25} />
          ) : (
            <FcLikePlaceholder size={25} />
          )}
        </button>
      </div>
      {/* heading */}
      <div className="p-2">
        <h1 className="my-2 text-[1.2rem] text-white font-extrabold">
          {title}
        </h1>
        {/* para */}
        <p onClick={handleReadMore}>
          {desc}
          <button onClick={handleReadMore} className="text-blue-400">
            {readMore ? <span>Show Less</span> : <span> ....Read More </span>}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Card;
