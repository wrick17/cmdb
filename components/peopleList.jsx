import { useState } from "react";
import Button from "../ui/button";
import Section from "../ui/section";
import ActorCard from "./actorCard";

const PeopleList = ({ title, list, sub }) => {
  const [showPeople, setShowPeople] = useState(false);

  if (!list?.length) return null;

  return (
    <div className="cast people-list">
      <Section title={title}>
        <div className="cast-list">
          {(showPeople ? list : list.slice(0, 10)).map((member) => (
            <ActorCard key={member.id + member[sub]} data={member} sub={sub} />
          ))}
          {list.length > 10 && (
            <div className="people-list-action">
              <Button
                frame="pentagon"
                style={{ fontSize: "12px" }}
                text={showPeople ? "Show Less" : "View All"}
                onClick={() => setShowPeople(!showPeople)}
              />
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};

export default PeopleList;
