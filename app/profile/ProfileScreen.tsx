"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type TabbarMode = {
  monitoring: boolean;
  continueBooking: boolean;
};

const TABBAR_MODE_KEY = "uz-tabbar-mode";
const DEFAULT_TABBAR_MODE: TabbarMode = {
  monitoring: false,
  continueBooking: false,
};

function readTabbarMode(): TabbarMode {
  if (typeof window === "undefined") {
    return DEFAULT_TABBAR_MODE;
  }

  try {
    const saved = window.localStorage.getItem(TABBAR_MODE_KEY);
    return saved ? { ...DEFAULT_TABBAR_MODE, ...JSON.parse(saved) } : DEFAULT_TABBAR_MODE;
  } catch {
    return DEFAULT_TABBAR_MODE;
  }
}

function writeTabbarMode(mode: TabbarMode) {
  window.localStorage.setItem(TABBAR_MODE_KEY, JSON.stringify(mode));
  window.dispatchEvent(new Event("tabbar-mode-change"));
}

function UzBonusBadge() {
  return <img src="/icons/uz-bonus-silver.svg" alt="" width="40" height="40" style={{ flexShrink: 0 }} />;
}

function IllustrationRevizorka() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g clipPath="url(#clip0_profile)">
        <path d="M37.3886 28.5835V11.4072C37.3886 10.4707 36.8885 9.6056 36.0771 9.1382L21.1584 0.544808C20.3494 0.0788139 19.3535 0.0788139 18.5445 0.544808L3.62583 9.1382C2.8144 9.6056 2.31433 10.4707 2.31433 11.4072V28.5835C2.31433 29.5199 2.8144 30.385 3.62583 30.8524L18.5445 39.4458C19.3535 39.9118 20.3494 39.9118 21.1584 39.4458L36.0771 30.8524C36.8885 30.385 37.3886 29.5199 37.3886 28.5835Z" fill="#E872AA"/>
        <path d="M15.8885 35.5625L16.1251 38.0541L14.2687 36.9848L15.8885 35.5625Z" fill="#EAC8C3"/>
        <path d="M2.31433 11.4141C2.31433 11.4141 8.82402 17.8168 13.2612 16.7182C18.1856 15.4991 27.2141 12.8316 30.7181 16.1201C33.3969 18.6342 37.3886 13.9629 37.3886 13.9629V26.4402C37.3886 26.4402 33.1576 32.234 28.366 30.568C25.5144 29.5766 21.687 27.3004 18.2657 28.6706C16.6081 29.3344 11.2648 32.0593 8.50502 29.5766C4.91234 26.3445 2.31433 28.5904 2.31433 28.5904V11.4141Z" fill="#ED80B9"/>
        <path d="M19.5077 26.8667C19.268 26.8897 19.0798 27.0804 19.0581 27.3203C18.9525 28.4875 18.4211 32.1134 18.6615 32.5843C19.0118 33.2704 31.7371 33.7496 31.8435 33.1107C31.95 32.4718 32.2695 27.4471 31.4176 27.2539C30.6466 27.079 21.612 26.6649 19.5077 26.8667Z" fill="#D85D9E"/>
        <path d="M20.1221 28.4531L30.7184 28.6661" stroke="#E872AA" strokeWidth="0.282857" strokeMiterlimit="10" strokeLinecap="round"/>
        <path d="M20.0821 29.8203L30.6784 30.0641" stroke="#E872AA" strokeWidth="0.282857" strokeMiterlimit="10" strokeLinecap="round"/>
        <path d="M20.1221 31.2812L26.4456 31.5741" stroke="#E872AA" strokeWidth="0.282857" strokeMiterlimit="10" strokeLinecap="round"/>
        <path d="M20.0008 32.7422C20.0008 32.7422 19.7478 34.5612 20.0821 34.6712C20.4163 34.7811 22.4775 33.0217 22.4775 33.0217L20.0008 32.7422Z" fill="#D85D9E"/>
        <path d="M14.2686 36.988L15.9369 35.5232C15.9369 35.5232 16.3233 35.0724 15.9369 33.9778C15.5506 32.8831 14.9268 32.1103 15.7317 30.919C16.5366 29.7278 16.738 29.3417 16.6837 28.583C16.6341 27.8891 16.3582 27.0003 16.26 25.8642C16.1909 25.0656 16.4904 23.7911 16.4904 23.7911C16.4904 23.7911 14.0696 22.6771 13.2969 23.965C12.5242 25.2528 11.6227 26.927 11.8159 28.4723C12.0091 30.0177 12.1379 33.0441 12.2344 33.849C12.331 34.6539 12.6113 35.8687 12.7723 36.1262L14.2686 36.988Z" fill="#F0F3F7"/>
        <path d="M21.1584 0.54481C20.3494 0.0788134 19.3535 0.0788134 18.5445 0.54481L9.10046 5.98474C9.10046 5.98474 11.6486 8.07012 15.1967 9.71329C17.2013 10.6416 19.8781 5.12819 23.1302 6.95985C25.42 8.24956 28.6682 7.9927 29.3529 6.60839C29.4997 6.31165 29.7156 5.97016 29.9638 5.61687L21.1584 0.54481Z" fill="#ED80B9"/>
        <path d="M28.3661 27.3465L29.8968 34.4138L36.0772 30.8538L34.2338 26.0625L28.3661 27.3465Z" fill="#EAC8C3"/>
        <g filter="url(#filter0_d_profile)">
          <path d="M18.9738 1.15234C19.6085 0.785868 20.3907 0.786006 21.0255 1.15234L35.8087 9.6875C36.4433 10.054 36.834 10.731 36.8341 11.4639V28.5332C36.8341 29.2662 36.4435 29.944 35.8087 30.3105L21.0255 38.8457C20.3907 39.212 19.6085 39.2122 18.9738 38.8457L4.19153 30.3105C3.55665 29.944 3.16516 29.2663 3.16516 28.5332V11.4639C3.16527 10.7309 3.55679 10.054 4.19153 9.6875L18.9738 1.15234Z" stroke="white" strokeWidth="1.71429" shapeRendering="crispEdges"/>
        </g>
        <path d="M27.3605 22.4873C27.3605 22.4873 25.7105 21.0364 25.5398 18.6751C25.3691 16.3139 25.682 13.3836 25.8812 13.2414C26.0803 13.0991 27.5596 13.469 28.214 14.0664C28.8683 14.6638 29.3804 16.2854 29.3519 16.6837C29.3235 17.082 29.1243 18.476 28.8967 19.045C28.6692 19.614 27.3605 22.4873 27.3605 22.4873Z" fill="#D3D9E5"/>
        <path d="M23.9767 7.43354C23.8452 7.44251 23.7659 7.58294 23.8272 7.69958C23.9852 7.99988 24.3304 8.48164 24.9626 8.61576C25.9015 8.8149 29.8967 8.24729 29.8967 8.24729C29.8967 8.24729 27.9177 7.08168 27.5716 7.18634C27.3236 7.26133 24.7235 7.38261 23.9767 7.43354Z" fill="#D3D9E5"/>
        <path d="M19.6257 10.9009C19.6257 10.9009 21.9428 10.607 22.0934 10.7094C22.244 10.8119 34.4929 6.86521 34.4929 6.86521C34.9807 6.64616 34.9608 5.60791 33.9315 5.88153C32.8738 6.16271 21.7195 9.56851 21.7195 9.56851L19.6257 10.9009Z" fill="#281466"/>
        <path d="M25.663 14.2096C25.663 14.2096 27.0285 14.0389 27.4268 14.4941C27.8251 14.9493 28.6773 15.9047 28.5648 16.4855C28.4723 16.9628 28.1034 18.1956 27.702 19.0975C27.378 19.8252 26.773 20.9712 26.9743 22.1926C27.2023 23.5769 28.451 24.3374 28.3372 25.0771C28.2575 25.595 28.1751 26.4127 28.1329 26.8566C28.1142 27.0529 28.2032 27.2428 28.3661 27.354C28.9856 27.7771 30.5636 28.7571 31.5583 28.5084C32.916 28.169 34.4953 26.3716 34.515 25.887C34.5349 25.3941 33.1674 23.533 32.7979 22.6525C32.3704 21.6342 31.5593 19.9607 31.9576 18.5952C32.3559 17.2296 33.5549 14.7217 33.1166 13.6975C32.767 12.8805 31.718 10.9075 30.9545 8.80427C30.7143 8.14272 28.0704 7.8939 26.1555 8.1215C24.2405 8.34909 23.4439 9.37325 23.4439 9.37325C23.4439 9.37325 22.7612 10.056 24.1836 10.056C25.6061 10.056 26.6479 9.82844 26.1555 10.2267C25.663 10.625 25.663 14.2096 25.663 14.2096Z" fill="white"/>
        <path d="M14.7773 3.35381C14.72 3.30288 14.6294 3.33145 14.6133 3.40641C14.2901 4.91583 11.8719 16.1806 11.5582 16.8048C11.1542 17.6086 16.2373 22.3424 16.2373 22.3424C16.2373 22.3424 26.0519 23.9299 26.1423 23.5146C26.4112 22.2794 26.6204 15.811 29.3949 10.1104C29.4488 9.99956 29.3863 9.86777 29.2659 9.84102L19.678 7.70994L14.7773 3.35381Z" fill="#1C3383"/>
        <path d="M15.3502 2.93885L15.2809 3.7977L19.4514 7.50486L15.4868 2.89438C15.4418 2.84196 15.3558 2.86995 15.3502 2.93885Z" fill="white"/>
        <path d="M15.8374 2.78352L15.8014 3.26127L18.1783 6.02536L15.9962 2.74199C15.9505 2.67318 15.8436 2.70113 15.8374 2.78352Z" fill="#EBEEF2"/>
        <path d="M28.5874 11.9706L28.5728 11.9531C28.5728 11.9531 25.4905 18.9939 22.5789 19.6196C16.0665 21.0189 16.1817 22.2938 16.1817 22.2938C16.2176 22.3275 16.237 22.3456 16.237 22.3456C16.237 22.3456 26.0516 23.9331 26.142 23.5178C26.382 22.4153 26.5761 17.144 28.5874 11.9706Z" fill="#132B70"/>
        <path d="M7.51743 25.6664C9.58699 25.6664 11.2647 23.9887 11.2647 21.9192C11.2647 19.8496 9.58699 18.1719 7.51743 18.1719C5.44786 18.1719 3.77014 19.8496 3.77014 21.9192C3.77014 23.9887 5.44786 25.6664 7.51743 25.6664Z" fill="#D85D9E"/>
        <path d="M8.80954 23.9631C8.78902 24.0914 8.65322 24.1647 8.53467 24.1116C7.88813 23.8218 6.07728 22.9655 5.41884 22.1882C4.84164 21.5068 5.39986 20.5754 6.30453 20.6799C6.88618 20.7471 7.40094 21.4774 7.40094 21.4774C7.40094 21.4774 6.91797 20.1628 7.71259 19.7619C8.54242 19.3432 8.94456 20.1089 9.0249 20.5424C9.18754 21.4201 8.91761 23.2874 8.80954 23.9631Z" fill="#E872AA"/>
        <path d="M19.6781 7.71094L16.0815 22.1879" stroke="#132B70" strokeWidth="0.282857" strokeMiterlimit="10"/>
        <path d="M29.1238 9.38571V9.81193L21.8505 8.19531L29.0421 9.29063C29.089 9.29779 29.1238 9.33818 29.1238 9.38571Z" fill="#EBEEF2"/>
        <path d="M14.2755 20.1616C14.2755 20.1616 15.2872 18.3513 16.6316 17.1799C17.0583 16.8081 17.2306 14.8505 15.5505 16.3023C13.9373 17.6962 12.6529 18.8779 12.0412 20.1014C11.4294 21.3248 10.1738 22.7736 10.1738 22.7736C10.1738 22.7736 9.85185 23.1922 9.91624 23.6107C9.98063 24.0292 9.69087 26.1863 10.2382 28.2147C10.7855 30.243 10.1416 30.6293 10.1416 30.6293C10.1416 30.6293 9.779 30.8547 9.89591 31.2733C10.0128 31.6918 9.94844 32.4967 9.69087 32.6577C9.43331 32.8186 9.14484 33.4634 9.4346 34.2039L13.7098 36.6661C14.8044 36.5695 13.2631 32.7487 13.293 31.6247C13.3135 30.8572 13.9993 30.6822 14.0393 29.5108C14.0842 28.1937 13.4935 27.7937 13.5734 26.9684C13.6601 26.0728 13.8092 25.2515 14.5983 25.1448C15.5833 25.0117 16.1842 24.3561 16.7081 24.2264C17.7231 23.9751 18.6557 24.1607 18.8811 23.7422C19.1065 23.3237 18.4091 23.0276 17.8296 22.9632C17.25 22.8988 16.7797 22.8613 16.0392 23.0866C16.0392 23.0866 16.12 22.9315 16.8146 22.7772C17.5334 22.6174 18.6929 22.489 19.1307 22.4777C19.7503 22.4616 20.4707 22.2609 20.5092 21.9885C20.5982 21.3595 19.8251 21.1866 18.971 21.1399C17.6931 21.07 15.6066 21.6191 15.6066 21.6191C15.6066 21.6191 15.956 21.0168 17.9493 20.0005C18.5571 19.6906 18.961 19.6557 19.5866 19.2165C19.8716 19.0164 20.3586 18.0318 18.8944 18.1782C17.0978 18.3579 14.2755 20.1616 14.2755 20.1616Z" fill="white"/>
        <path d="M14.9149 23.5175L16.0392 23.0876C16.1852 22.9401 16.5627 22.8375 16.6914 22.8071C16.8768 22.7632 19.034 22.4825 19.034 22.4825C19.034 22.4825 16.2164 21.8825 14.9149 23.5175Z" fill="#F0F3F7"/>
        <path d="M14.2542 22.4312C14.948 21.962 15.3499 21.8958 15.6067 21.617C16.5353 20.6092 18.2658 19.8516 18.2658 19.8516C15.6125 19.9984 14.2542 22.4312 14.2542 22.4312Z" fill="#F0F3F7"/>
        <path d="M14.2756 20.1525C14.2756 20.1525 15.3082 18.3628 16.5875 17.2097C16.7101 17.0992 16.9778 16.842 16.9086 16.1695C16.8637 15.7326 14.1098 17.7713 13.294 19.2329C12.9945 19.7695 12.9196 20.5532 13.0195 20.6173C13.222 20.7472 14.0045 20.3278 14.2756 20.1525Z" fill="#F0F3F7"/>
        <path d="M36.8195 22.5406C38.0712 22.5406 39.0859 21.5259 39.0859 20.2742C39.0859 19.0225 38.0712 18.0078 36.8195 18.0078C35.5678 18.0078 34.5531 19.0225 34.5531 20.2742C34.5531 21.5259 35.5678 22.5406 36.8195 22.5406Z" fill="#1C3383"/>
        <path d="M13.7318 9.55962C13.7318 9.55962 14.8782 9.96726 15.4173 9.08874C15.9564 8.21022 15.8965 7.67603 16.6353 7.41402C17.374 7.15201 17.3475 6.09924 17.0329 5.83968C16.7183 5.58011 14.9032 4.01562 14.9032 4.01562L13.7318 9.55962Z" fill="#1B3889"/>
        <path d="M38.2478 18.5078C38.2478 18.5078 38.5213 20.1972 37.5298 20.8267C36.3304 21.5883 36.1636 22.4398 36.1636 22.4398C36.3707 22.502 36.5898 22.5364 36.8171 22.5364C38.07 22.5364 39.0857 21.5206 39.0857 20.2677C39.0857 19.5574 38.7588 18.9238 38.2478 18.5078Z" fill="#132B70"/>
        <path d="M36.9315 18.9877L37.1606 19.6928C37.1924 19.7905 37.2834 19.8566 37.3861 19.8566H38.1274C38.2417 19.8566 38.2892 20.0028 38.1967 20.0699L37.597 20.5057C37.5139 20.566 37.4791 20.673 37.5109 20.7707L37.7399 21.4758C37.7752 21.5844 37.6509 21.6748 37.5585 21.6076L36.9587 21.1719C36.8756 21.1115 36.7631 21.1115 36.68 21.1719L36.0803 21.6076C35.9879 21.6748 35.8635 21.5844 35.8988 21.4758L36.1279 20.7707C36.1596 20.673 36.1249 20.566 36.0418 20.5057L35.442 20.0699C35.3496 20.0028 35.3971 19.8566 35.5113 19.8566H36.2527C36.3554 19.8566 36.4464 19.7905 36.4781 19.6928L36.7072 18.9877C36.7425 18.8791 36.8962 18.8791 36.9315 18.9877Z" fill="#FFDB43"/>
        <path d="M7.63354 10.4629C9.26289 10.4629 10.5837 9.14204 10.5837 7.5127C10.5837 5.88335 9.26289 4.5625 7.63354 4.5625C6.0042 4.5625 4.68335 5.88335 4.68335 7.5127C4.68335 9.14204 6.0042 10.4629 7.63354 10.4629Z" fill="#1C3383"/>
        <path d="M9.49416 5.22656C9.49416 5.22656 9.84981 7.4235 8.56048 8.24212C7.00075 9.23242 6.78394 10.3398 6.78394 10.3398C7.05316 10.4206 7.33809 10.4653 7.63366 10.4653C9.26301 10.4653 10.5839 9.14447 10.5839 7.51511C10.5839 6.5914 10.1588 5.76752 9.49416 5.22656Z" fill="#132B70"/>
        <path d="M7.7456 5.74554L8.09371 6.8169C8.12544 6.91457 8.21646 6.9807 8.31916 6.9807H9.44565C9.55988 6.9807 9.60737 7.12687 9.51496 7.19401L8.60361 7.85614C8.52052 7.91651 8.48576 8.02351 8.51749 8.12118L8.8656 9.19253C8.9009 9.30117 8.77656 9.39151 8.68414 9.32437L7.77279 8.66223C7.68971 8.60187 7.57721 8.60187 7.49412 8.66223L6.58277 9.32437C6.49036 9.39151 6.36602 9.30117 6.40132 9.19253L6.74942 8.12118C6.78116 8.02351 6.74639 7.91651 6.66331 7.85614L5.75196 7.19401C5.65955 7.12687 5.70704 6.9807 5.82127 6.9807H6.94776C7.05046 6.9807 7.14147 6.91457 7.17321 6.8169L7.52131 5.74554C7.55661 5.6369 7.71031 5.6369 7.7456 5.74554Z" fill="#FFDB43"/>
        <path d="M7.7456 5.74554L8.09371 6.8169C8.12544 6.91457 8.21646 6.9807 8.31916 6.9807H9.44565C9.55988 6.9807 9.60737 7.12687 9.51496 7.19401C9.51496 7.19401 8.78789 7.55647 7.74054 7.35155C7.16651 7.23924 6.63284 8.47998 6.63284 8.47998L6.74942 8.12118C6.78116 8.02351 6.74639 7.91651 6.66331 7.85614L5.75196 7.19401C5.65955 7.12687 5.70704 6.9807 5.82127 6.9807H6.94776C7.05046 6.9807 7.14147 6.91457 7.17321 6.8169L7.52131 5.74554C7.55661 5.6369 7.71031 5.6369 7.7456 5.74554Z" fill="#FFE67D"/>
        <path d="M25.693 4.90536C26.7348 4.90536 27.5793 4.06084 27.5793 3.01908C27.5793 1.97733 26.7348 1.13281 25.693 1.13281C24.6513 1.13281 23.8068 1.97733 23.8068 3.01908C23.8068 4.06084 24.6513 4.90536 25.693 4.90536Z" fill="#D85D9E"/>
        <path d="M25.2398 4.14637C25.1814 4.17572 25.1115 4.1418 25.0984 4.07775C25.0266 3.7284 24.8438 2.73683 24.9676 2.23923C25.0762 1.80303 25.6209 1.75712 25.8443 2.15742C25.9879 2.41478 25.841 2.83987 25.841 2.83987C25.841 2.83987 26.2359 2.25593 26.6334 2.46261C27.0485 2.67845 26.854 3.06794 26.7005 3.22827C26.3898 3.55286 25.5477 3.99177 25.2398 4.14637Z" fill="#E872AA"/>
      </g>
      <defs>
        <filter id="filter0_d_profile" x="0.225016" y="-1.64323" width="39.55" height="44.1198" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="0.416667"/>
          <feGaussianBlur stdDeviation="1.04167"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_profile"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_profile" result="shape"/>
        </filter>
        <clipPath id="clip0_profile">
          <rect width="40" height="40" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function AvatarIcon() {
  return (
    <img
      src="https://www.figma.com/api/mcp/asset/931046ca-28d6-46d1-821a-444d8214ab76"
      alt=""
      width="24"
      height="24"
      style={{ borderRadius: "50%", display: "block", flexShrink: 0 }}
    />
  );
}

function PeopleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <g clipPath="url(#clip-people)">
        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 21V19C3 17.9391 3.42143 16.9217 4.17157 16.1716C4.92172 15.4214 5.93913 15 7 15H11C12.0609 15 13.0783 15.4214 13.8284 16.1716C14.5786 16.9217 15 17.9391 15 19V21" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13281C16.8604 3.35311 17.623 3.85351 18.1676 4.55512C18.7122 5.25673 19.0078 6.11964 19.0078 7.00781C19.0078 7.89598 18.7122 8.75889 18.1676 9.4605C17.623 10.1621 16.8604 10.6625 16 10.8828" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 20.9984V18.9984C20.9949 18.1156 20.6979 17.2592 20.1553 16.5628C19.6126 15.8664 18.8548 15.3691 18 15.1484" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip-people"><rect width="24" height="24" fill="white"/></clipPath>
      </defs>
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="18" height="13" rx="2" stroke="#2C2E32" strokeWidth="2"/>
      <path d="M3 10h18" stroke="#2C2E32" strokeWidth="2"/>
      <path d="M7 14h4" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="17" cy="14" r="1" fill="#2C2E32"/>
      <circle cx="14" cy="14" r="1" fill="#2C2E32"/>
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <g clipPath="url(#clip-bell)">
        <path d="M10 5C10 4.46957 10.2107 3.96086 10.5858 3.58579C10.9609 3.21071 11.4696 3 12 3C12.5304 3 13.0391 3.21071 13.4142 3.58579C13.7893 3.96086 14 4.46957 14 5C15.1484 5.54303 16.1274 6.38833 16.8321 7.4453C17.5367 8.50227 17.9404 9.73107 18 11V14C18.0753 14.6217 18.2954 15.2171 18.6428 15.7381C18.9902 16.2592 19.4551 16.6914 20 17H4C4.54494 16.6914 5.00981 16.2592 5.35719 15.7381C5.70457 15.2171 5.92474 14.6217 6 14V11C6.05956 9.73107 6.4633 8.50227 7.16795 7.4453C7.8726 6.38833 8.85159 5.54303 10 5" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 17V18C9 18.7956 9.31607 19.5587 9.87868 20.1213C10.4413 20.6839 11.2044 21 12 21C12.7956 21 13.5587 20.6839 14.1213 20.1213C14.6839 19.5587 15 18.7956 15 18V17" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 6.727C20.3441 5.30025 19.3916 4.02969 18.206 3" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 6.727C3.65535 5.30044 4.60715 4.0299 5.792 3" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip-bell"><rect width="24" height="24" fill="white"/></clipPath>
      </defs>
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="#2C2E32" strokeWidth="2"/>
      <path d="M3 12h18" stroke="#2C2E32" strokeWidth="2"/>
      <path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9" stroke="#2C2E32" strokeWidth="2"/>
      <path d="M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9" stroke="#2C2E32" strokeWidth="2"/>
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="#2C2E32" strokeWidth="2"/>
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M1.62952 6.07522C4.79543 7.04437 8.16617 7.12884 11.3767 6.31948L13.951 5.67049C16.7356 4.96851 19.6659 5.10937 22.3703 6.07522V12.0011C19.6659 11.0352 16.7355 10.8944 13.951 11.5964L11.3767 12.2453C8.16617 13.0547 4.79543 12.9702 1.62952 12.0011V6.07522Z" fill="#0069FF"/>
      <path d="M1.62952 11.9971C4.79543 12.9662 8.16617 13.0507 11.3767 12.2414L13.951 11.5924C16.7356 10.8904 19.6659 11.0312 22.3703 11.9971V17.923C19.6659 16.9571 16.7355 16.8163 13.951 17.5182L11.3767 18.1672C8.16617 18.9766 4.79543 18.8921 1.62952 17.923V11.9971Z" fill="#FFC70A"/>
    </svg>
  );
}

function HorseKidsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3.5 17.5C9.16667 22.1667 14.8333 22.1667 20.5 17.5C13.8571 18.7606 10.155 18.7337 3.5 17.5Z" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 18.5L17 10L18 8L20 9L21.5 7.5L19 3C13.948 3.218 13.01 6.133 12 9H6C5.20435 9 4.44129 9.31607 3.87868 9.87868C3.31607 10.4413 3 11.2044 3 12M5 18.5L7 9" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 20L10 15H14L16 20" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 3h6v6" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 14L21 3" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="#2C2E32" strokeWidth="2"/>
      <path d="M12 11v5" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="8" r="0.5" fill="#2C2E32" stroke="#2C2E32" strokeWidth="1.5"/>
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="#2C2E32" strokeWidth="2"/>
      <circle cx="12" cy="12" r="3" stroke="#2C2E32" strokeWidth="2"/>
      <path d="M4.93 4.93l3.54 3.54M15.54 15.54l3.53 3.53M4.93 19.07l3.54-3.53M15.54 8.46l3.53-3.53" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3v13" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 7l4-4 4 4" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 12v7a1 1 0 001 1h12a1 1 0 001-1v-7" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V9l-5-6z" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 3v6h6" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 13h6M9 17h4" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

type ProfileRowProps = {
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  isLast?: boolean;
  href?: string;
};

function ProfileRow({ label, sublabel, icon, isLast, href }: ProfileRowProps) {
  const className = `profile-row${isLast ? " profile-row-last" : ""}`;
  const inner = (
    <>
      <span className="profile-row-label">{label}</span>
      {sublabel && <span className="profile-row-sublabel">{sublabel}</span>}
      <div className="profile-row-icon">{icon}</div>
    </>
  );
  if (href) {
    return <Link href={href} className={className} style={{ textDecoration: "none" }}>{inner}</Link>;
  }
  return <div className={className}>{inner}</div>;
}

type ProfileToggleProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

function ProfileToggle({ label, checked, onChange }: ProfileToggleProps) {
  return (
    <button className="profile-toggle" type="button" role="switch" aria-checked={checked} onClick={onChange}>
      <span className="profile-toggle-label">{label}</span>
      <span className="profile-toggle-control" aria-hidden />
    </button>
  );
}

export function ProfileScreen() {
  const [tabbarMode, setTabbarMode] = useState<TabbarMode>(DEFAULT_TABBAR_MODE);

  useEffect(() => {
    const syncMode = () => setTabbarMode(readTabbarMode());
    syncMode();
    window.addEventListener("storage", syncMode);
    window.addEventListener("tabbar-mode-change", syncMode);

    return () => {
      window.removeEventListener("storage", syncMode);
      window.removeEventListener("tabbar-mode-change", syncMode);
    };
  }, []);

  function updateTabbarMode(nextMode: TabbarMode) {
    setTabbarMode(nextMode);
    writeTabbarMode(nextMode);
  }

  return (
    <div className="profile-page">
      <div className="profile-offers">
        <div className="profile-offers-item">
          <UzBonusBadge />
          <div className="profile-offers-text">
            <span className="profile-offers-value">500</span>
            <span className="profile-offers-sublabel">обіймашок</span>
          </div>
        </div>

        <div className="profile-offers-sep" />

        <div className="profile-offers-item">
          <IllustrationRevizorka />
          <div className="profile-offers-text">
            <span className="profile-offers-value">1 / 24</span>
            <span className="profile-offers-sublabel">нагород</span>
          </div>
        </div>

        <button className="profile-offers-btn" type="button" aria-label="Переглянути">
          <ChevronRightIcon />
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <p className="profile-section-title">Налаштування</p>
          <div className="profile-card">
            <ProfileRow label="Мої дані" icon={<AvatarIcon />} />
            <ProfileRow label="Пасажири" icon={<PeopleIcon />} />
            <ProfileRow label="Платіжні картки" icon={<CardIcon />} />
            <ProfileRow label="Сповіщення" icon={<BellIcon />} href="/notifications" />
            <ProfileRow label="Мова" sublabel="Українська (UA)" icon={<GlobeIcon />} />
            <ProfileRow label="Тема" sublabel="Світла" icon={<SunIcon />} isLast />
          </div>
        </div>

        <div className="profile-card">
          <ProfileRow label="3000 кілометрів Україною" icon={<FlagIcon />} />
          <ProfileRow label="Дитяча залізниця" icon={<HorseKidsIcon />} />
          <ProfileRow label="Замовлення сервісів" icon={<ExternalLinkIcon />} isLast />
        </div>

        <div className="profile-section">
          <p className="profile-section-title">Корисне</p>
          <div className="profile-card">
            <ProfileRow label="Часті питання" icon={<InfoIcon />} />
            <ProfileRow label="Зворотний зв'язок" icon={<HelpIcon />} />
            <ProfileRow label="Порадити друзям" icon={<ShareIcon />} />
            <ProfileRow label="Договір оферти" icon={<FileIcon />} isLast />
          </div>
        </div>

        <div className="profile-card">
          <button className="profile-logout" type="button">
            Вийти з аккаунту
          </button>
        </div>

        <p className="profile-version">Версія 3.0.0</p>

        <div className="profile-card profile-toggle-card" aria-label="Режими таббару">
          <ProfileToggle
            label="Моніторинг"
            checked={tabbarMode.monitoring}
            onChange={() => updateTabbarMode({ ...tabbarMode, monitoring: !tabbarMode.monitoring })}
          />
          <ProfileToggle
            label="Продовжити бронювання"
            checked={tabbarMode.continueBooking}
            onChange={() => updateTabbarMode({ ...tabbarMode, continueBooking: !tabbarMode.continueBooking })}
          />
        </div>
      </div>
    </div>
  );
}
