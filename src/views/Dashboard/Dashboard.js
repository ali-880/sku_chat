import React from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";


import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import SchoolIcon from '@material-ui/icons/School';
import CreateIcon from '@material-ui/icons/Create';



import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { ToastContainer } from "react-toastify";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <PeopleOutlineIcon/>
              </CardIcon>
              <p className={classes.cardCategory} style={{fontFamily:'BYekan'}}>تعداد دانشجویان</p>
              <h3 className={classes.cardTitle} style={{fontFamily:'BYekan'}}>
                767 <small style={{fontFamily:'BYekan'}}>نفر</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                تعداد دانشجویانی که حداقل در یک کلاس سامانه حضور دارند
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <CreateIcon/>
              </CardIcon>
              <p className={classes.cardCategory} style={{fontFamily:'BYekan'}}>تعداد اساتید</p>
              <h3 className={classes.cardTitle} style={{fontFamily:'BYekan'}}>45
                <small style={{fontFamily:'BYekan'}}> نفر</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                اساتیدی که در این ترم کلاسی در سامانه دارند
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <MenuBookIcon/>
              </CardIcon>
              <p className={classes.cardCategory} style={{fontFamily:'BYekan'}}>تعداد کلاس ها</p>
              <h3 className={classes.cardTitle} style={{fontFamily:'BYekan'}}>22
                <small style={{fontFamily:'BYekan'}}>  نفر</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                تعداد کلاس هایی که گروه در سامانه دارند
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <SchoolIcon />
              </CardIcon>
              <p className={classes.cardCategory} style={{fontFamily:'BYekan'}}>ترم زوج</p>
              <h3 className={classes.cardTitle} style={{fontFamily:'BYekan'}}>99-00</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                ترم تحصیلی
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>لیست ادمین های سایت</h4>
              <p className={classes.cardCategoryWhite}>
                ادمین ها توانایی حذف دانشجو یا کلاس یا استاد را داراند و همین طور می توانند کلاسی را تشکیل دهند و برای دانشجویان انتخاب واحد کنند
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="danger"
                tableHead={["ردیف", "نام", "گروه درسی", "حدف"]}
                tableData={[
                  ["1", "سید علیرضا ", "حسینی", "حذف"],
                  ["2", "مسیح ", "خمینی", "حذف"],
                  ["3", "فرهاد ", "مجیدی", "حذف"],
                  ["4", "مجید ", "نکونام", "حذف"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>لینک سایت ها ی دانشگاه</h4>
              <p className={classes.cardCategoryWhite}>
                لینک سایت ها ی مورد استفاده و  تایید دانشگاه شهرکرد
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ردیف", "نام سایت", "لینک"]}
                tableData={[
                  ["1", "سایت اصلی", "https://www.sku.ac.ir"],
                  ["2", "سایت امتحانات", "http://exam.sku.ac.ir"],
                  ["3", "سامانه sess", "https://sess.sku.ac.ir"],

                 
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <ToastContainer/>
    </div>
  );
}
