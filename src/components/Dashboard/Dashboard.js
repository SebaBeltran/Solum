import React, { Component } from 'react';
import { FlexColumn, MainContentWrapper, ListWrapper, Div, MainContent, FlexRow, FlipIn} from "./../lib/Base";
import { H1, H3, H4, H5, H6, Small, P  } from "./../lib/Typography";
import {connect} from "react-redux";
import { getUser, getClients, getProjects, currentProject, getTasks, getTotalTime, getProductivity, updateTask, selectTask} from "./../../redux/reducer";
import {StatisticsWrapper, Productivity, ChartsWrapper, ProjectItem, ProjectTitleWrapper, TagColor, WelcomeHeader, ListDivider, CompletedItem, Check} from "./../lib/Dashboard";
import TimeTracker from "./../TimeTracker/TimeTrackerDashboard"
import { Line } from 'react-chartjs-2';
import moment from "moment"
import {SlideToRight, StatsSlideToRight} from "./../lib/animations"

class Dashboard extends Component {
  constructor(){
    super();

    this.state = {
      date: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      todaysTasks: [],
      todaysCompleted: [],
      dates: [],
      times: [],
      dataObj: {},
      currentWeek:[]
    }
    this.thisWeek = []
  }

componentDidMount() {
  this.props.getUser().then( async () => {
  await this.props.getTasks(this.props.user.id);
  this.props.getClients(this.props.user.id);
  this.props.getProjects(this.props.user.id);
  this.props.getTotalTime(this.props.user.id);
  }).then( async () =>{
    await this.props.getProductivity(this.props.user.id)
      this.getWeeksForMonth(this.state.month, this.state.year)
      this.getTotalIncome();
      this.getActiveTasksForToday();
      this.productivityArr();

  })
    
  }

  componentDidUpdate(prevProps){
    if(this.state.todaysTasks.length !== 0 && prevProps.tasks.length !== this.props.tasks.length){
      this.getActiveTasksForToday()
    }
  }
  getTotalIncome = () => {

    let income = 0
    this.props.projects.forEach( p => income += p.rate * Math.round(p.tracked_time/60/60))
    return income
  }

  getActiveTasksForToday = () => {
    let completedToday = []
    const {date, month, year} = this.state
    let todaysTasks = this.props.tasks.filter( 
      task=>{; if(task.due_date!== null && task.status === "active" && +task.due_date.substring(0,4) === year && +task.due_date.substring(5,7) === month+1 && +task.due_date.substring(8,10) === date){
        return true
      }
      else if(task.status === "completed" && +task.completed_date.substring(0,4) === year && +task.completed_date.substring(5,7) === month+1 && +task.completed_date.substring(8,10) === date){
        completedToday.push(task)
      }
    } 
  )
    this.setState({todaysTasks: todaysTasks, todaysCompleted: completedToday})
  }

  getClientName = project_id => {
    const currentProject = this.props.projects.find( project => project.project_id === project_id)
    const currentClient =  this.props.clients.find( client => client.client_id === currentProject.client_id)
    return currentClient.company
  }

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
        +d.substring(7,9) === this.state.date  && thisWeek.length === 0 ? thisWeek = [...week] : null

      })
    })
    this.setState({currentWeek: thisWeek})
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
    let tasksPerDay = [0, 0, 0, 0, 0, 0, 0]
    var counts = {};
    this.props.weekProductivity.forEach(obj => dateArr.sort().push(obj.completed_date))
    dateArr.forEach( x => { x !== null ? counts[x] = (counts[x] || 0)+1 : null });
    let hey =  Object.keys(counts).map(d => {return d.substring(5,6) === "0" ? d.substring(0,5) + d.substring(6) : null })
    if(this.state.currentWeek) {
      this.state.currentWeek.map( (date, i) =>{
        
      var times = Object.values(counts)
          hey.map( (pDate, j) => {pDate === date ? tasksPerDay.splice(i, 1, times.splice(j,1)[0]) : null
          })
        })
    }
      this.setState({dates: Object.keys(counts), times: tasksPerDay, dataObj: counts})
  }

  handleChange = task => {
    if(task.status === "completed"){
      task.status = "active";
      task.d_date = moment().format("YYYY-MM-DD");
      task.completed_date = null
    } else if(task.status === "active"){
      task.status = "completed"
      task.completed_date = moment().format("YYYY-MM-DD")
      task.d_date = null
    }

    this.props.selectTask(task)
  }

  render() {
    const {date, month, year, todaysTasks, todaysCompleted} = this.state

    let name = this.props.user.user_name ? this.props.user.user_name.split(" ") : " "
    let totalProjects = this.props.projects.length !== 0 ? this.props.projects.length : 0
    let totalTasks = this.props.tasks.length !== 0 ? this.props.tasks.length : 0
    let completedTasks = this.props.tasks.length !== 0 ? this.props.tasks.filter(task => {if(task.status === "completed"){return task}}) : 0;
    
    let totalTime = 0;
    this.props.tasks.map(task => totalTime += task.tracked_time);

    const dataProductivity = {
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
      datasets: [
        {
          label: 'tasks completed',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 2,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.state.times,
          lineTension: 0.4,
          showLines: false
        }
      ]
    };
    
    
    const mappedActive = todaysTasks.map((task, i) => {
      const {project_id, tracked_time, color_tag, task_id} = task;
      return(
        <SlideToRight>
        <ProjectItem  id={task_id}  color={color_tag} onClick={() => this.handleChange(task)}>
          <FlexColumn>
            <Small mt="0" mb="10" ml="0px" lineH="1.9">{this.getClientName(project_id)}</Small>  
            <ProjectTitleWrapper>
              <H5 mt="0" mb="0" ml="0px" lineH="1.3">{task.task}</H5>
              <TagColor color={color_tag}/>
            </ProjectTitleWrapper>  
              <Small>Time Tracked: {this.timeConvert(tracked_time)}</Small>
            <FlexRow>
            </FlexRow>
          </FlexColumn>
        </ProjectItem>
        </SlideToRight>
     )
    })

    const mappedCompleted = todaysCompleted.map((task, i) => {
      const {project_id, tracked_time, color_tag, task_id} = task;
      return(
        <SlideToRight>
        <CompletedItem  id={task_id}  color={color_tag} onClick={() => this.handleChange(task)}>
          <FlexColumn>
            <Small mt="0" mb="10" ml="0px" lineH="1.9">{this.getClientName(project_id)}</Small>  
            <ProjectTitleWrapper>
              <FlexRow>
                <Check/>
                <H5 mt="0" mb="0" ml="0px" lineH="1.3">{task.task}</H5>
              </FlexRow>
              <TagColor color={color_tag}/>
            </ProjectTitleWrapper>  
              <Small>Time Tracked: {this.timeConvert(tracked_time)}</Small>
            <FlexRow>
            </FlexRow>
          </FlexColumn>
        </CompletedItem>
        </SlideToRight>
        )
    })
    return (
      
      <MainContentWrapper>
        <ListWrapper>
          <WelcomeHeader>
            <H5>Welcome back {name[0]}, <br/>these are your tasks for today {month}/{date}/{year}</H5>
          </WelcomeHeader>
          {mappedActive}
          <ListDivider>----- COMPLETED -----</ListDivider>
          {mappedCompleted}
        </ListWrapper>
        <Div>
        {/* <TimeTracker/> */}
          <MainContent>
          <H1>DASHBOARD</H1>
          <StatsSlideToRight>
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
          </StatsSlideToRight>
          <FlipIn>
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
          </ChartsWrapper>
          </FlipIn>
        </MainContent>   
        </Div>
      </MainContentWrapper>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    clients: state.clients,
    projects: state.projects,
    tasks: state.tasks,
    weekProductivity: state.weekProductivity
  };
}

export default connect(mapStateToProps, {getUser, getClients, getProjects, currentProject, getTasks, getTotalTime, getProductivity, updateTask, selectTask})(Dashboard);