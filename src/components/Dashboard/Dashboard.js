import React, { Component } from 'react';
import { FlexColumn, MainContentWrapper, ListWrapper, Div, ListHeader, MainContent, FlexRow, ListItem } from "./../lib/Base";
import { H1, H3, H4, H5, H6, Small, P  } from "./../lib/Typography";
import {connect} from "react-redux";
import { getUser, getClients, getProjects, currentProject, getTasks, getTotalTime, getProductivity} from "./../../redux/reducer";
import {StatisticsWrapper, Productivity, PieProjects, ChartsWrapper, ProjectItem, ProjectTitleWrapper, TagColor} from "./../lib/Dashboard";
import {red} from "./../lib/Colors"
import TimeTracker from "./../TimeTracker/TimeTracker"
import { Line, Pie } from 'react-chartjs-2';
// import moment()

class Dashboard extends Component {
  constructor(){
    super();

    this.state = {
      date: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      todaysTasks: [],
      dates: [],
      times: [],
      dataObj: {}
    }
    this.thisWeek = []
  }

  componentDidMount() {
    this.props.getUser().then( () => {
    this.props.getClients(this.props.user.id);
    this.props.getProjects(this.props.user.id);
    this.props.getTasks(this.props.user.id);
    this.props.getTotalTime(this.props.user.id);
    this.props.getProductivity(this.props.user.id)
    }).then(()=> {
      this.productivityArr();
      this.getTotalIncome();
      this.getTasksForToday();
      this.getWeeksForMonth(this.state.month-1, this.state.year)
    }).then(() => {})
  }

  getTotalIncome = () => {
    let income = 0
    this.props.projects.forEach( p => income += p.rate * Math.round(p.tracked_time/60/60))
    return income
  }

  getTasksForToday = () => {
    const {date, month, year} = this.state
    let todaysTasks = this.props.tasks.filter( task => task.due_date !== null 
      ? 
      +task.due_date.substring(0,4) === year && 
      +task.due_date.substring(5,7) === month && 
      +task.due_date.substring(8,10) === date 
        ?
        task
        :
        false      
      : false)
    this.setState({todaysTasks: todaysTasks})
  }

  getClientName = project_id => {
    const currentProject = this.props.projects.find( project => project.project_id === project_id)
    const currentClient =  this.props.clients.find( client => client.client_id === currentProject.client_id)
    return currentClient.company
  }

  // getWeeksForMonth = (month, year) => {
  //   const firstOfMonth = new Date(year, month, 1);
  //   const firstDayOfWeek = firstOfMonth.getDay();
  //   const weeks =[[]];
  
  //   let currentWeek = weeks[0];
  //   let currentDate = firstOfMonth;
  //   let prevOffsetCounter = 0
  //   let nextOffsetCounter = 1
  
  //   for (let i = 1; i < firstDayOfWeek; i++){
  //     let offsetDay = new Date(year, month, prevOffsetCounter)
  //     currentWeek.push(offsetDay)
  //     prevOffsetCounter --
  //   }
  
  //   while (currentDate.getMonth() === month){
  //     if (currentWeek.length === 7){
  //       currentWeek = [];
  //       weeks.push(currentWeek)
  //     }
  
  //     currentWeek.push(currentDate);
  //     currentDate = new Date(year, month, currentDate.getDate()+1)
  //   }
  
  //   while(currentWeek.length < 7){
  //     let offsetDay = new Date(year, month+1, nextOffsetCounter)
  //     currentWeek.push(offsetDay)
  //     nextOffsetCounter ++
  //   }
    
  //   weeks.filter( week => {
  //     week.forEach( d => {
  //       d !==null 
  //       ? d.getDate() === this.state.date ? this.thisWeek = [...week] : null
  //       : null
  //     })
  //   })
  // }


  getWeeksForMonth = (month, year) => {
    let thisWeek = []

    const firstOfMonth = new Date(year, month, 1);
    const firstDayOfWeek = firstOfMonth.getDay();
    let weeks =[[]];
  
    let currentWeek = weeks[0];
    let currentDate = firstOfMonth;
    let prevOffsetCounter = 0
    let nextOffsetCounter = 1
  
    for (let i = 1; i < firstDayOfWeek; i++){
      let offsetDay = new Date(year, month, prevOffsetCounter)
      let oD = offsetDay.getDate()
      let oM = offsetDay.getMonth()
      let oY = offsetDay.getFullYear()
      let newDate = oY + "-" + oM + "-" + oD
      currentWeek.push(newDate)
      prevOffsetCounter --
    }

    while (currentDate.getMonth() === month){
      if (currentWeek.length === 7){
        currentWeek = [];
        weeks.push(currentWeek)
      }
  
      currentWeek.push(currentDate);
      currentDate = new Date(year, month, currentDate.getDate()+1)
    }
  
    while(currentWeek.length < 7){
      let offsetDay = new Date(year, month+1, nextOffsetCounter)
      currentWeek.push(offsetDay)
      nextOffsetCounter ++
    }
    let testWeek = []

    weeks = weeks.map(week => {
      week.map(date => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]
        if(typeof date === "object"){
        let parseDate = date.toString().split(" ")
        let parsedMonth = (months.indexOf(parseDate[1])+1).toString()
        date = parseDate[3]+ "-" + parsedMonth + "-" + parseDate[2]
        
      }

      if(testWeek.length < 7){
      testWeek.push(date)
      }
      else {
        testWeek = []
        testWeek.push(date)
      }
      })
      return testWeek
    })
    weeks = weeks.map(week => week.sort((a,b) => a - b))
    weeks.filter( week => {
      week.forEach( d => {
        +d.substring(7,9) === this.state.date ? thisWeek = [...week] : null
      })
    })
    this.setState({dates: thisWeek})
  }



  timeConvert = (num) => {
    let hours = (num/60 >= 60) ? 
                Math.floor(num/60/60) < 10 ? 
                  "0" +  Math.floor(num/60/60) : 
                  Math.floor(num/60/60) 
                : "00";

    let minutes = (num/60 < 60) ? 
                    Math.floor(num/60 < 10) ?
                      "0" + Math.floor(num/60) : 
                      Math.floor(num/60) :
                  (num/60%60 < 10) ?
                  "0" + Math.floor(num/60%60) :
                  Math.floor(num/60%60);
    
    return hours + ":" + minutes;     
  }

  productivityArr = () =>{
    let dateArr = []
    var counts = {};
    this.props.weekProductivity.forEach(obj => dateArr.sort().push(obj.completed_date))
    dateArr.forEach( x => { counts[x] = (counts[x] || 0)+1; });
      //console.log(this.props.weekProductivity)
      this.setState({dates: Object.keys(counts), times:  Object.values(counts), dataObj: counts})
  }
  render() {
    
    const {date, month, year, todaysTasks} = this.state

    let name = this.props.user.user_name ? this.props.user.user_name.split(" ") : " "
    let totalProjects = this.props.projects.length !== 0 ? this.props.projects.length : 0
    let totalTasks = this.props.tasks.length !== 0 ? this.props.tasks.length : 0
    let completedTasks = this.props.tasks.length !== 0 ? this.props.tasks.filter(task => {if(task.status === "completed"){return task}}) : 0;
    
    let totalTime = 0;
    this.props.tasks.map(task => totalTime += task.tracked_time);

    // const weekDays = this.thisWeek.map(date => date !== null ? date.getDate() : null)
    
    const dataProductivity = {
      labels: this.state.dates,
      datasets: [
        {
          label: 'tasks completed',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: Object.values(this.state.dataObj),
          lineTension: 0.4,
          showLines: false
        }
      ]
    };

    const dataProjects = {
      labels: [
        'Red',
        'Green',
        'Yellow'
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
        ],
        hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
        ]
      }]
    };
    
    
    const mappedTasks = todaysTasks.map((task, i) => {
      // console.log(task)
      const {project_id, estimated_hours, tracked_time, color_tag} = task;
      return(
        <ProjectItem  id={project_id}  color={color_tag}>
          <FlexColumn>
            <Small mt="0" mb="10" ml="0px" lineH="1.9">{this.getClientName(project_id)}</Small>  
            <ProjectTitleWrapper>
              <H5 mt="0" mb="0" ml="0px" lineH="1.3">task</H5>
              <TagColor color={color_tag}/>
            </ProjectTitleWrapper>  
            <FlexRow>
              <Small mt="0" mb="10" ml="0px" lineH="1.9">{this.timeConvert(tracked_time)}</Small>
            </FlexRow>
          </FlexColumn>
        </ProjectItem>
        )
    })
    console.log(this.state)
    return (
      
      <MainContentWrapper>
        <ListWrapper>
          <ListHeader>
            <H5>Welcome back {name[0]}, <br/>these are your tasks for today {month}/{date}/{year}</H5>
          </ListHeader>
          {mappedTasks}
        </ListWrapper>
        <Div>
        <TimeTracker/>
          <MainContent>
          <H1>DASHBOARD</H1>
          <StatisticsWrapper>
          <FlexColumn>
              <H3>${this.getTotalIncome()}</H3>
              <H6>TOTAL INCOME</H6>
            </FlexColumn>
            <FlexColumn>
              <H3>{this.timeConvert(totalTime)}</H3>
              <H6>TOTAL BILLED HOURS</H6>
            </FlexColumn>
            <FlexColumn>
              <H3>{totalProjects}</H3>
              <H6>TOTAL PROJECTS</H6>
            </FlexColumn>
            <FlexColumn>
              <H3>{completedTasks.length}/{totalTasks}</H3>
              <H6>TASKS COMPLETED</H6>
            </FlexColumn>
          </StatisticsWrapper>
          <ChartsWrapper>
          <Productivity>
            <H4>WEEK PRODUCTIVITY</H4>
            <Line
              data={dataProductivity}
              width={50}
              height={15}
              options={{
                maintainAspectRatio: true,
                scales: {
                  yAxes: [{
                    ticks: {
                       max: this.props.maxY,
                       min: 0,
                     }
                   }]
                  },
              }}
            />
          </Productivity> 

          <PieProjects>
          <H4>TIME PER PROJECT</H4>
          <Pie data={dataProjects} />
          </PieProjects>
          </ChartsWrapper>
        </MainContent>   
        </Div>
      </MainContentWrapper>
    )
  }
}

function mapStateToProps(state) {
  console.log(state.tasks)
  return {
    user: state.user,
    clients: state.clients,
    projects: state.projects,
    tasks: state.tasks,
    weekProductivity: state.weekProductivity
  };
}

export default connect(mapStateToProps, {getUser, getClients, getProjects, currentProject, getTasks, getTotalTime, getProductivity})(Dashboard);