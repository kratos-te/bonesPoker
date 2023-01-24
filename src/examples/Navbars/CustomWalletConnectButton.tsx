import type { FC, MouseEventHandler } from "react";
import React, { useCallback, useMemo } from "react";
import type { ButtonProps } from "./ConnectButton";
import { ConnectButton } from "./ConnectButton";
import { userProfile as UserProfileIcon } from "../svgIcons";
import { useWallet } from "@solana/wallet-adapter-react";

export const CustomWalletConnectButton: FC<ButtonProps> = ({
  children,
  disabled,
  onClick,
  ...props
}) => {
  const { wallet, connect, connecting, connected } = useWallet();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (onClick) onClick(event);
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      if (!event.defaultPrevented) connect().catch(() => {});
    },
    [onClick, connect]
  );

  const content = useMemo(() => {
    if (children) return children;
    if (connecting) return "Connecting ...";
    if (connected) return "Connected";
    if (wallet) return "Connect";
    return "Connect Wallet";
  }, [children, connecting, connected, wallet]);

  return (
    <ConnectButton
      className="wallet-adapter-button-trigger"
      disabled={disabled || !wallet || connecting || connected}
      startIcon={wallet ? <UserProfileIcon /> : undefined}
      onClick={handleClick}
      {...props}
    >
      {content}
    </ConnectButton>
  );
};
