import Section from "../ui/section";
import ActorCard from "./actorCard";

const PeopleList = ({ title, list, sub }) => {
  if (!list?.length) return null;

  return (
    <div className="cast people-list">
      <Section title={title}>
        <div className="cast-list">
          {list.map((member) => (
            <ActorCard key={member.id + member[sub]} data={member} sub={sub} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default PeopleList;
