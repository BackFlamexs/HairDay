import logoUrl from "../../assets/hairday-logo.svg";

type HairDayLogoProps = {
  className?: string;
};

export const HairDayLogo: React.FC<HairDayLogoProps> = ({ className = "h-10 w-10" }) => {
  return <img src={logoUrl} alt="" aria-hidden="true" className={className} />;
};
