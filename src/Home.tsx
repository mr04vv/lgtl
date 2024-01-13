import { hc } from "hono/client";

type Props = {
  imageUrls: string[];
};
export const Home = async (props: Props) => {
  return (
    <div>
      {props.imageUrls.map((url) => (
        <img src={url} />
      ))}
    </div>
  );
};
