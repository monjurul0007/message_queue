import BaseBackground from "@/components/BaseBackground";
import Button from "@/components/Button";
import { supabase } from "@/supabase";
import { api } from "@/utils/api";
import { useState, useEffect } from "react";

interface Message {
  id: number;
  message: string;
  seen: boolean;
  createdBy: string;
}

const Receive = () => {
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const allDbMessages = api.messages.getAllMessages.useMutation({
    onSuccess: (data) => {
      setAllMessages(data as Message[]);
    },
  });
  const markRead = api.messages.markRead.useMutation();

  const onMarkAsRead = () => {
    markRead.mutate();
  };

  useEffect(() => {
    allDbMessages.mutate();
  }, []);

  useEffect(() => {
    supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Messages",
        },
        () => {
          allDbMessages.mutate();
        },
      )
      .subscribe();
  }, []);

  return (
    <BaseBackground>
      <div className="w-[45%] text-start">
        {allMessages.map((item) => (
          <div
            key={item.id}
            className="mt-4 flex flex-row items-baseline rounded-lg bg-white bg-opacity-50 p-2"
          >
            <span className="basis-4/5">{item.message}</span>
            <div className="basis-1/5 text-end text-xs">
              {item.seen ? (
                <span className="text-lime-500">seen</span>
              ) : (
                <span className="text-blue-700">delivered</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
        <Button onClick={onMarkAsRead}>Mark as Read</Button>
      </div>
    </BaseBackground>
  );
};

export default Receive;
