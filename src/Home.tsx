import { css } from "hono/css";
import back from "/static/back.svg";
import nikukyu from "/static/nikukyu.svg";
import backMobile from "/static/back-mobile.svg";
import { memo } from "hono/jsx";
type Props = {
  imageUrls: string[];
};

const bodyClass = css`
  margin-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  overflow: hidden;
  position: relative;
`;

const boxClass = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 8px;
  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`;

const imgWrapperClass = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px;
`;

const background = css`
  position: absolute;
  top: 0;
  right: 0;
`;

const txt = css`
  font-family: "nekoneco";
`;

const brownTxt = css`
  color: #59370f;
`;
const orangeTxt = css`
  color: #e8912b;
`;

const imgClass = css`
  width: 90%;
`;

const fotter = css`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const fotterTxt = css`
  color: #59370f;
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const nikukyuImg = css`
  width: 32px;
`;

const link = css`
  &::before {
    content: "";
    margin-left: 4px;
  }
  &::after {
    content: "🐈";
    margin-left: 4px;
  }
  color: #59370f;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const Home = async (props: Props) => {
  return (
    <div class={bodyClass}>
      <img class={background} src={backMobile} />
      <h1 class={txt}>
        {[..."LGTLatte"].map((str, idx) => {
          if (idx === 0 || idx === 2 || idx === 4 || idx === 7)
            return <span class={orangeTxt}>{str}</span>;
          return <span class={brownTxt}>{str}</span>;
        })}
      </h1>
      <div class={boxClass}>
        {props.imageUrls.map((url) => (
          <div class={imgWrapperClass}>
            <img class={imgClass} src={url} />
          </div>
        ))}
      </div>
      <div class={fotter}>
        <img class={nikukyuImg} src={nikukyu} />
        <p class={fotterTxt}>
          Copyright © 2024
          <a class={link} href="https://mooriii.com" target="__blank">
            mooriii
          </a>
        </p>
        <img class={nikukyuImg} src={nikukyu} />
      </div>
    </div>
  );
};
