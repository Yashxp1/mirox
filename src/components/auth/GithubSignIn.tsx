"use client";
import React from "react";
import { Button } from "../ui/button";
import { GithubIcon } from "lucide-react";
import { signInWithGithub } from "@/actions/Github";

const Github = () => {
  return (
    <form action={signInWithGithub}>
      <Button
        type="submit"
        variant="outline"
        className="flex justify-center items-center"
      >
        <GithubIcon className="mr-2" /> Continue with GitHub
      </Button>
    </form>
  );
};

export default Github;