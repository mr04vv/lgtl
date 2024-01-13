import { css } from "hono/css";
import back from "/static/back.svg";
import nikukyu from "/static/nikukyu.svg";
import backMobile from "/static/back-mobile.svg";
import { html } from "hono/html";
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
  position: relative;
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
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
  transition: opacity 0.2s ease-in-out;
  position: relative;
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
  display: flex;
  align-items: center;
  &:hover {
    text-decoration: underline;
  }
`;

const copiedTxt = css`
  position: absolute;
  background-color: #0000004f;
  width: 100%;
  height: 100%;
  width: 90%;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
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
        {props.imageUrls.map((url) => {
          const copyText = `![LGTM](${url})`;
          return (
            <div class={imgWrapperClass}>
              {html`
                <div x-data="{ copied: false }">
                  <img
                    @click="navigator.clipboard.writeText('${copyText}'), copied = true, setTimeout(() => copied = false, 1000)"
                    class="${imgClass}"
                    src="${url}"
                  />
                  <div class="${copiedTxt}" x-show="copied" x-transition>
                    コピーしたニャ！
                  </div>
                </div>
              `}
            </div>
          );
        })}
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
