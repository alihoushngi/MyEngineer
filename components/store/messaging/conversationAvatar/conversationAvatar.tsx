import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";

import { getDisplayInitials } from "@/lib/auth/display-initials/display-initials";

type ConversationAvatarProps = {
  name: string;
  src?: string;
};

export function ConversationAvatar({ name, src }: ConversationAvatarProps) {
  return (
    <Avatar
      size="sm"
      className="mt-0.5 shrink-0 border border-border-subtle bg-surface shadow-xs"
    >
      {src ? <AvatarImage src={src} alt="" /> : null}
      <AvatarFallback className="bg-primary-subtle font-semibold text-primary">
        {getDisplayInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
