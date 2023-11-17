import React from 'react';
import _ from 'lodash';

export class Table extends React.Component{
    skillNames = [];
    areaNames = [];
    diffNames = [];
    constructor(props){
        super(props);
        this.state = {
            filter: {},
            ord: {desc: false, key: 'id'},
            tasksToDisplay: props.tasks
        }
        this.skillNames = _.uniq(props.tasks.flatMap(x => Object.keys(x.skills)));
        this.areaNames = _.uniq(props.tasks.map(x => x.area));
        this.diffNames = _.uniq(props.tasks.map(x => x.difficulty));
    }
    filter(tasks){
        const {filter} = this.state;
        const {name, desc, area, diff, complete, skill} = filter;
        if([name, desc, area, diff, complete, skill].every(x => x === undefined || x.length === 0)){
            return tasks;
        }
        return tasks.filter(x => {
            if(name && name.length && x.name.toLowerCase().indexOf(name.toLowerCase()) > -1){
                console.log("name matches");
                return true;
            }
            if(desc && desc.length && x.desc.toLowerCase().indexOf(desc.toLowerCase()) > -1){
                console.log("desc matches");
                return true;
            }
            if(area && area.length && x.area === area){
                console.log("area matches");
                return true;
            }
            if(diff && diff.length && x.diff === diff){
                console.log("diff matches");
                return true;
            }
            if(complete !== undefined && x.complete === complete){
                console.log("comp matches");
                return true;
            }
            if(skill && skill.length && x.skills[skill] !== undefined){
                console.log("skill matches");
                return true;
            }
            return false;
        });
    }
    filterChange(key, val){
        var filter = {...this.state.filter};
        filter[key] = val;
        this.setState({filter}, () => this.updateList());
    }
    updateList(){
        
        var tl = this.props.tasks;
        var filtered = this.filter(tl);
        var ordered = this.order(filtered);
        this.setState({tasksToDisplay: ordered});
    }
    componentDidUpdate(props){
        if(props.tasks !== this.props.tasks){
            this.updateList();
        }
    }
    order(tasks){
        var tasksCopy = [...tasks];
        var {key, desc} = this.state.ord;
        tasksCopy.sort((a, b) => {
            return a[key] > b[key] && !desc
                ? 1
                : -1;
        });
        return tasksCopy;
    }
    columnHeaderClick(column){
        let {key, desc} = this.state.ord;
        if(key !== column){
            key = column;
            desc = false;
        } else {
            desc = !desc;
        }
        this.setState({ord: {key, desc}});
        this.updateList();
    }
    render(){
        return <div>
            <div className="filters table table-condensed">
                <label>Name <input onBlur={(e) => this.filterChange('name', e.target.value)}/></label>
                <label>Description <input onBlur={(e) => this.filterChange('desc', e.target.value)}/></label>
                <label>Area <select onChange={(e) => this.filterChange('area', e.target.value)}>
                    <option value={undefined}>None</option>
                    {this.areaNames.map(x => <option>{x}</option>)}
                    </select></label>
                <label>Difficulty <select onChange={(e) => this.filterChange('diff', e.target.value)}>
                    <option value={undefined}>None</option>
                    {this.diffNames.map(x => <option>{x}</option>)}
                    </select></label>
                <label>Skills <select onChange={(e) => this.filterChange('skill', e.target.value)}>
                    <option value={undefined}>None</option>
                    {this.skillNames.map(x => <option>{x}</option>)}
                    </select>
                </label>
                <label>Complete <select onChange={(e) => this.filterChange('complete', e.target.value)}>
                    <option value={undefined}>None</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select></label>
            </div>
            <table>
            <thead>
                <tr>
                    <th style={{width: '300px'}} onClick={() => this.columnHeaderClick('name')}>Name {this.state.ord.key == 'name' ? (this.state.ord.desc ? '\\/' : "/\\") : ""}</th>
                    <th onClick={() => this.columnHeaderClick('desc')}>Description {this.state.ord.key == 'desc' ? (this.state.ord.desc ? '\\/' : "/\\") : ""}</th>
                    <th >Skills</th>
                    <th onClick={() => this.columnHeaderClick('area')} style={{width: '100px'}}>Area {this.state.ord.key == 'area' ? (this.state.ord.desc ? '\\/' : "/\\") : ""}</th>
                    <th onClick={() => this.columnHeaderClick('difficulty')} style={{width: '100px'}}>Difficulty {this.state.ord.key == 'difficulty' ? (this.state.ord.desc ? '\\/' : "/\\") : ""}</th>
                    <th style={{width: "200px"}}></th>
                </tr>
            </thead>
            <tbody>
                {this.state.tasksToDisplay.map(t => {
                    return <tr className={t.complete ? 'complete': ''} style={{textAlign: 'left'}} key={t.id}>
                        <td>{t.name}</td>
                        <td dangerouslySetInnerHTML={{__html: t.desc}}></td>
                        <td>{Object.keys(t.skills).map(s => {
                            return <span>{s}: {t.skills[s]} <br/></span>;
                        })}</td>
                        <td>{t.area}</td>
                        <td>{t.difficulty}</td>
                        <td>
                            <button onClick={() => this.props.personalChange(t)} className="btn btn-primary btn-sm">
                                {t.personal ? 'Deselect' : 'Select'}
                            </button>
                            <button onClick={() => this.props.completeChange(t)} className="btn btn-secondary btn-sm">
                                {t.complete ? 'Uncomplete' : 'Complete'}
                            </button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
        </div>
    }
}