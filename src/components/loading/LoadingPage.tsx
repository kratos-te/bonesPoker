import ClipLoader from "react-spinners/ClipLoader";
import { FC } from "react";

interface LoadingProps {
  text: string;
  color: string;
}
const LoadingPage: FC<LoadingProps> = ({ text, color }) => {
  return (
    <div className="loading">
      <ClipLoader color={color} />
      <span style={{ color: color }}>{text}</span>
    </div>
  );
};

export default LoadingPage;
