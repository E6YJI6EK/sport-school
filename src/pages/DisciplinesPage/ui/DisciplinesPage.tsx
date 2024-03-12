import { memo, useEffect, useState } from "react";
import AddDisciplineForm from "./AddDisciplineForm";
import DisciplineList from "./DisciplineList";
import { getCoaches } from "src/shared/services/fetchCoaches";
import { Typography } from "@mui/material";

const DisciplinesPage = memo(() => {
  const [coaches, setCoaches] = useState<Array<any>>([]);

  useEffect(() => {
    getCoaches(setCoaches);
  }, []);
  return (
    <div>
      <Typography variant="h4">Добавить спорт. дисциплину</Typography>
      <AddDisciplineForm coaches={coaches} />
      <Typography variant="h4">Все дисциплины</Typography>
      <DisciplineList coaches={coaches} />
    </div>
  );
});

export default DisciplinesPage;
