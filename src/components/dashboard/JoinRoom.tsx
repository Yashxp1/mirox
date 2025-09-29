'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface WorkspaceResponse {
  id: string;
}

const JoinRoom = () => {
  const [roomId, setRoomId] = useState<string>('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

  const handleJoinRoom = async () => {
    if (!roomId) return;

    try {
      const res = await axios.post<WorkspaceResponse>('/api/workspace/check', {
        workspaceId: roomId,
      });

      router.push(`/dashboard/workspace/${res.data.id}/`);

      console.log(res.data);
    } catch (error) {
      console.log(error);
      alert('Server error');
    }
  };

  return (
    <div className="border-b flex items-center justify-center">
      <div className="flex flex-col w-[20%] gap-4 py-10">
        <Input
          value={roomId}
          onChange={handleInputChange}
          className="focus:outline-none ring-0 border rounded-md"
        />
        <div className="w-full flex gap-4 justify-center items-center">
          <Button onClick={handleJoinRoom}>Join workspace</Button>
          <Button variant="outline">Create workspace</Button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
