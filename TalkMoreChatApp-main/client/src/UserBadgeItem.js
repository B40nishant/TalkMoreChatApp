import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";

const UserBadgeItem = ({ user,admin,handlefunction}) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      backgroundpColor = "purpule"
      color="white"
      cursor="pointer"
    
    >
      {user.name}
      {admin === user._id && <span>(Admin)</span>}
      <CloseIcon  onClick={handlefunction}  pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;