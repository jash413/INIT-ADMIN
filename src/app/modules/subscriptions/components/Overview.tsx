import { Link } from "react-router-dom";
import { KTIcon } from "../../../../_metronic/helpers";
import {
  TablesWidget10,
} from "./TablesWidget10";
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
