import { useState } from "react";
import Button from "../ui/button";
import Section from "../ui/section";
import ActorCard from "./actorCard";

const PeopleList = ({ title, list, sub }) => {
  const [showPeople, setShowPeople] = useState(false);

  if (!list?.length) return null;

  return (
    <div className="cast">
      <Section title={title}>
        <div className="cast-list">
          {(showPeople ? list : list.slice(0, 10)).map((member) => (
            <ActorCard key={member.id + member[sub]} data={member} sub={sub} />
          ))}
          {list.length > 10 && (
            <Button
              frame="pentagon"
              containerStyles={{
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
              }}
              style={{ fontSize: "12px" }}
              text={showPeople ? "Show Less" : "View All"}
              onClick={() => setShowPeople(!showPeople)}
            />
          )}
        </div>
      </Section>
    </div>
  );
};

export default PeopleList;
