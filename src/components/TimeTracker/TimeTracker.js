import React, { Component } from 'react';
import { FlexRow, FlexColumn} from './../lib/Base';
import { TrackerWrapper, TimerWrapper, TimerButton, TimerInput, ButtonWrapper,  ColorTagWrapper, DropDown, DefaultTag, FilteredListItem, SimpleFilteredListWrapper} from './../lib/TimeTracker';
import { tag_blue, tag_green, tag_lightblue, tag_orange, tag_pink, tag_red, tag_violet, tag_yellow
} from './../lib/Colors';
import {TagSelector, TagLabel, TagCheck} from "./../lib/Projects"
import { H5 } from './../lib/Typography';
import { connect } from 'react-redux';
import { updateTask, addTask } from './../../redux/reducer';
import moment from "moment"
import {DropdownIn} from "./../lib/animations"


class TimeTracker extends Component {
	constructor() {
		super();

		this.state = {
      task_id: "",
      d_date: "",
			time: 0,
			trackingTask: '',
      color_tag: "lightGrey",
			toggleDropDown: false,
			tasksList: [],
			timerId: 0
		};
	}

	componentDidUpdate(prevProps, nextProps){
		if(nextProps.trackingTask){
			const currentTask = prevProps.tasks.filter(
				(task) => task.task === nextProps.trackingTask
			);
			if(currentTask.length !== 0){
				if(currentTask[0].task_id !== nextProps.task_id){
					this.setState({task_id: currentTask[0].task_id})
				}
			}
		}
	}

	handleInputs = (val) => {
		this.setState({ [val.target.name]: val.target.value, toggleDropDown: false, time: 0 });
		this.handleSearch(val.target.value);
	};

	handleSearch = (val) => {
		if (!val) {
			this.setState({ tasksList: [] });
		} else {
			let filtered = this.props.tasks.filter((task) => {
				if (task.task.toLowerCase().includes(val.toLowerCase())) {
					return true;
				} else {
					return false;
				}
			});
			this.setState({ tasksList: filtered });
		}
	};

	handleSelection = (val) => {
    const currenTask = this.state.tasksList.filter(obj => obj.task === val)
    const { task, color_tag, tracked_time, task_id, due_date, client_id } = currenTask[0]

		this.setState({ tasksList: [], trackingTask: task, color_tag: color_tag, time: tracked_time, task_id: task_id, d_date: due_date ? due_date : moment().format("YYYY-MM-DD"), client_id: client_id});
	};

	checkTimer = () => {
		let currentTime = this.state.time;
		const {task_id, d_date, time, trackingTask, color_tag} = this.state
		
		//if timerId is not 0, timer is running, so stop it
		if(this.state.timerId !== 0){
			clearInterval(this.state.timerId);
			this.setState({ isRunning: false, tasksList: [], time: 0, trackingTask: "", color_tag: "lightGrey", toggleDropDown: false, timerId: 0, task_id: "" });


			const body = {
				task_id: task_id,
				project_id: this.props.match.params.id,
				task: trackingTask,
				tracked_time: time,
				status: 'active',
				d_date: !d_date ? moment().format("YYYY-MM-DD") : d_date,
				color_tag: color_tag,
				user_id: this.props.user.id
			};
			this.props.updateTask(body);
		}

		else {
			this.setState({timerId: setInterval(() => {
				this.setState({ time: currentTime += 1 });
			}, 1000) })
					
			if (!this.state.task_id) {
				const body = {
					user_id: this.props.user.id,
					project_id: this.props.match.params.id,
					task: trackingTask,
					tracked_time: time,
					status: 'active',
					d_date: !d_date ? moment().format("YYYY-MM-DD") : d_date,
					color_tag: color_tag
				};
					this.props.addTask(body);
			} 
			else {
				const body = {
					task_id: task_id,
					project_id: this.props.match.params.id,
					task: trackingTask,
					tracked_time: time,
					status: 'active',
					d_date: !d_date ? moment().format("YYYY-MM-DD") : d_date,
					color_tag: color_tag,
					user_id: this.props.user.id
				};
				this.props.updateTask(body);
			}
		}	
	};

	timeConvert = (num) => {
		let hours = num / 60 >= 60
				? Math.floor(num / 60 / 60) < 10 ? '0' + Math.floor(num / 60 / 60) : Math.floor(num / 60 / 60)
				: '00';

		let minutes = num / 60 < 60
				? Math.floor(num / 60 < 10) ? '0' + Math.floor(num / 60) : Math.floor(num / 60)
				: (num / 60) % 60 < 10 ? '0' + Math.floor((num / 60) % 60) : Math.floor((num / 60) % 60);

		let seconds = num % 60 >= 10 ? num % 60 : '0' + num % 60;

		return hours + ':' + minutes + ':' + seconds;
	};

	render() {
		const mappedList = this.state.tasksList.map((task, i) => {
			return (
        <DropdownIn>
       
				<FilteredListItem key={i} onClick={() => this.handleSelection(task.task)}>
					{task.task}
				</FilteredListItem>
        </DropdownIn>
			);
    });
		return (
			<FlexColumn>
				<TrackerWrapper>
					<ColorTagWrapper> 
          <DefaultTag color={this.state.color_tag} onClick={()=>this.setState({toggleDropDown: !this.state.toggleDropDown} )}/>
						{this.state.toggleDropDown ?
              <DropDown>
									<TagLabel>
										<TagSelector
											type="radio"
											name="color_tag"
											value={tag_pink}
											color={tag_pink}
											onChange={this.handleInputs}
										/>
										<TagCheck color={tag_pink} />
									</TagLabel>

									<TagLabel>
										<TagSelector
											type="radio"
											name="color_tag"
											value={tag_violet}
											color={tag_violet}
											onChange={this.handleInputs}
										/>
										<TagCheck color={tag_violet} />
									</TagLabel>

									<TagLabel>
										<TagSelector
											type="radio"
											name="color_tag"
											value={tag_blue}
											color={tag_blue}
											onChange={this.handleInputs}
										/>
										<TagCheck color={tag_blue} />
									</TagLabel>

									<TagLabel>
										<TagSelector
											type="radio"
											name="color_tag"
											value={tag_lightblue}
											color={tag_lightblue}
											onChange={this.handleInputs}
										/>
										<TagCheck color={tag_lightblue} />
									</TagLabel>

									<TagLabel>
										<TagSelector
											type="radio"
											name="color_tag"
											value={tag_green}
											color={tag_green}
											onChange={this.handleInputs}
										/>
										<TagCheck color={tag_green} />
									</TagLabel>

									<TagLabel>
										<TagSelector
											type="radio"
											name="color_tag"
											value={tag_yellow}
											color={tag_yellow}
											onChange={this.handleInputs}
										/>
										<TagCheck color={tag_yellow} />
									</TagLabel>

									<TagLabel>
										<TagSelector
											type="radio"
											name="color_tag"
											value={tag_orange}
											color={tag_orange}
											onChange={this.handleInputs}
										/>
										<TagCheck color={tag_orange} />
									</TagLabel>

									<TagLabel>
										<TagSelector
											type="radio"
											name="color_tag"
											value={tag_red}
											color={tag_red}
											onChange={this.handleInputs}
										/>
										<TagCheck color={tag_red} />
									</TagLabel>
            </DropDown>
            :
            ""
          }
					</ColorTagWrapper>
					<FlexRow>
						<TimerInput
							value={this.state.trackingTask ? this.state.trackingTask : ""}
							placeholder="What are you working on?"
							name="trackingTask"
							onChange={(e) => this.handleInputs(e)}
						/>
						<TimerWrapper>
							<H5>{this.timeConvert(this.state.time)}</H5>
						</TimerWrapper>
						<ButtonWrapper>
							{this.state.timerId === 0 ? (
								<TimerButton onClick={() => this.checkTimer()} data-icon="&#xe071;" />
							) : (
								<TimerButton onClick={() => this.checkTimer()} data-icon="&#xe072;" />
							)}
						</ButtonWrapper>
					</FlexRow>
				</TrackerWrapper>
				<SimpleFilteredListWrapper>
					{mappedList}
				</SimpleFilteredListWrapper>
			</FlexColumn>
		);
	}
}

function mapStateToProps(state) {
	const filteredTasks = state.tasks.filter(
		(task) => task.project_id === state.currentProjectId && task.status === 'active'
	);
	return {
		user: state.user,
		tasks: filteredTasks
	};
}
export default connect(mapStateToProps, { addTask, updateTask })(TimeTracker);
