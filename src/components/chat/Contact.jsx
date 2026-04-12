import { useEffect, useState } from "react";

import { getUser } from "../../services/ChatService";
import UserLayout from "../layouts/UserLayout";

const Contact = ({ chatRoom, onlineUsersId, currentUser }) => {
  const [contact, setContact] = useState();

  useEffect(() => {
    const contactId = chatRoom?.members?.find(
      (member) => member !== currentUser.uid,
    );

    const fetchData = async () => {
      const res = await getUser(contactId);
      setContact(res);
    };

    fetchData();
  }, [chatRoom, currentUser]);

  return <UserLayout user={contact} onlineUsersId={onlineUsersId} />;
};

export default Contact;
