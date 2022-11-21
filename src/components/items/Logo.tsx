import { FiUploadCloud } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

export const Logo = () => {
  return (
    <div
      data-aos="zoom-in"
      className="flex items-center font-bold text-2xl cursor-pointer"
    >
      <FiUploadCloud className="h-10 w-10 text-purple-600" />
      <h2 className="pl-3">Uploader</h2>
    </div>
  );
};
