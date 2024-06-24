import { Link } from "react-router-dom";
import { KTIcon } from "../../../../_metronic/helpers";
import {
  ChartsWidget1,
  ListsWidget5,
  TablesWidget1,
  TablesWidget10,
} from "../../../../_metronic/partials/widgets";
import { Content } from "../../../../_metronic/layout/components/content";

export function Overview() {
  return (
    <Content>
      <div className="row gy-10 gx-xl-10">
        <TablesWidget10 className="card-xxl-stretch mb-5 mb-xl-10" />
      </div>
    </Content>
  );
}
