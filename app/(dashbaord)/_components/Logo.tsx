import Image from "next/image";

export const Logo = () => {
    return (
        <div className={"flex items-center space-x-2"}>
            <Image
              src="/logo.svg"
              alt="logo"
              width={132}
              height={132}
            />
        </div>
    );
}
