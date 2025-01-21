"use client";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./BackButton";
import { Header } from "./Heading";
import { Social } from "./Social";

interface CardComponentProp {
  children: React.ReactNode;
  headerLabel: string;
  headerTitle?: string;
  backButtonLabel?: string;
  backButtonLink?: string;
  backButtonHref?: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  backButtonLink,
}: CardComponentProp) => {
  return (
    <div>
      <Card className="shadow-md ">
        <CardHeader>
          <Header label={headerLabel} />
        </CardHeader>
        <CardContent>{children}</CardContent>
        {showSocial && (
          <CardFooter>
            <Social />
          </CardFooter>
        )}
        <CardFooter>
          <BackButton
            label={backButtonLabel || ""}
            href={backButtonHref || ""}
            link={backButtonLink || ""}
          />
        </CardFooter>
      </Card>
    </div>
  );
};
