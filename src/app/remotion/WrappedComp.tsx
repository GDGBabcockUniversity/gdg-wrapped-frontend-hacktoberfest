import { useState } from "react";
import { Sequence } from "remotion";
import { DataMember } from "@/types/general.types";
import LandingPage from "@/layouts/index/landingpage";
import DawnPatrol from "@/layouts/index/peakhours/dawnpatrol";
import EsteemedObserver from "@/layouts/index/resourcecontributors/esteemedobserver";

export default function WrappedComposition() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isDoneForMessages, setIsDoneForMessages] = useState<boolean>(false);
  const [isDoneForMessagesImpact, setIsDoneForMessagesImpact] =
    useState<boolean>(false);
  const [isDoneForResource, setIsDoneForResource] = useState<boolean>(false);
  const [isDoneForQuestion, setIsDoneForQuestion] = useState<boolean>(false);

  const [step, setStep] = useState<number>(1);
  const [member, setMember] = useState<DataMember>(mem);

  return (
    <>
      <Sequence from={0} durationInFrames={240}>
        <DawnPatrol
          hour={member.peak_hour}
          setHour={() => console.log()}
          isbuttonVisible={false}
          hanldeNext={() => {}}
        />
      </Sequence>

      <Sequence from={241} durationInFrames={480}>
        <EsteemedObserver
          resourcePerc={member.resources_top_perc}
          isbuttonVisible={false}
          handleNext={()=> {}}
        />
      </Sequence>
    </>
  );
}

var phoneNumber = "23"
var setPhoneNumber = () => {}
var handleSubmmit = () => {}

const mem: DataMember = {
  number_of_messages_sent: 1082,
  percentile_messages: 99.73,
  messages_top_perc: "Top 0.5%",
  number_of_links: 11,
  percentile_links: 97.59,
  resources_top_perc: "Top 5%",
  number_of_questions: 47,
  percentile_questions: 98.93,
  questions_top_perc: "Top 5%",
  message_impact_score: 12.68,
  percentile_impact: 99.47,
  message_impact_top_perc: "Top 1%",
  peak_weekday: 2,
  peak_hour: 23,
  peak_day_and_hour: "June, 21, 2023 at 23:00",
}
