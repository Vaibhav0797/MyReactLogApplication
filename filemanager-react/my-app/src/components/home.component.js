import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './data.json';
import { Link } from "react-router-dom";

const indexData = data.index;

class Folder2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: indexData,
            subFoldersData: [],
            folderSelected: false,
            previousClick: [],
            folderPath: [],
        }
    }
    writeLogToDB = () => {

       var logPathArray=[];
      logPathArray=this.state.folderPath;
        
       var log="root";
       for(var i=0;i<=logPathArray.length-1;i++){
          var temp=log+"/"+logPathArray[i];
          log=temp;
          debugger
       }
       
        debugger
        const requestOptions = {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ logname:log })
        };
        fetch('http://localhost:8081/saveLog', requestOptions)
            .then(response => response.json())
            .then( data =>alert("Added"));
    }



    handleClick = (e, s) => {
        debugger;
        console.log(s);

        if (s.type === "folder") {
            var tempFolderPath = []
            var previousFolder = [];
            previousFolder.push(...this.state.previousClick);
            previousFolder.push(this.state.index);

            tempFolderPath.push(...this.state.folderPath);
            tempFolderPath.push(s.name);
            this.setState({
                index: s.files,
                previousClick: previousFolder,
                folderPath: tempFolderPath
            })
        }
        else{
            alert("No Data Available");
        }
    }
    loodPriviousFolder = () => {
        var tempFolderpath = [];
        var previousFolder = this.state.previousClick;
        var lastindex = previousFolder.length;


        if (lastindex > 0) {
            var lastDirectoryFolder = previousFolder[lastindex - 1]
            previousFolder.splice(lastindex - 1, 1);
            tempFolderpath = this.removeFolderFrpmPath();
            this.setState({ index: lastDirectoryFolder, previousClick: previousFolder, folderPath: tempFolderpath });
        }

    }
    removeFolderFrpmPath = () => {
        var tempFolderPath = this.state.folderPath;
        var lastindex = tempFolderPath.length;
        tempFolderPath.splice(lastindex - 1, 1)
        return tempFolderPath;
    }

    render() {

        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <div class="container">
                                     
                        <form onSubmit="return false" >
                        <button type="button" class="button"  onClick={e => { this.writeLogToDB() }} >Generate Log</button>
                    
                            <div >
                                <li style={{
                                    float: "left", display: "inline-block",
                                    paddingRight: "1.8%",
                                    marginTop: "0.01%"
                                }}>
                                    <button type="button" className="btn btn-outline-light text-dark" onClick={e => { this.loodPriviousFolder() }} >
                                        <img src="https://img.icons8.com/flat_round/25/000000/arrow-left.png" />
                                    </button>
                                    <button type="button" className="btn btn-outline-light text-dark">
                                        <img src="https://img.icons8.com/flat_round/25/000000/arrow-right.png" />
                                    </button>
                                </li>
        
                                <label style={{ float: "left", marginTop: "1%" }}>Root
                                {this.state.folderPath.map(data => (
                                    <label className="path">  / {data}  </label>
                                ))}
                                </label>
                                
                            </div>
                            
                            <br />
                            <table class="table">
                                <thead >
                                    <tr>
                                        <th>File Name</th>
                                        <th>Type</th>
                                        <th>Size</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            {this.state.index.map(s => (
                                                <div>
                                                    {s.type == "image" ?
                                                        (<img src="https://img.icons8.com/cute-clipart/25/000000/image-file.png" />)
                                                        :
                                                        s.type == "folder" ?
                                                            <img src="https://img.icons8.com/color/25/000000/folder-invoices.png" />
                                                            :
                                                            <img src="https://img.icons8.com/color/25/000000/txt.png" />
                                                    }
                                                    <button type="button" style={{paddingBottom:"5px"}} className="button" onClick={e => { this.handleClick(e, s) }}> {s.name} </button>

                                                </div>
                                            ))}
                                            {}
                                            <img src="https://img.icons8.com/color/25/000000/folder-invoices.png" />
                                            <button type="button" onClick={e => { this.loodPriviousFolder() }} className="button">..</button>

                                        </td>
                                        <td>
                                            {this.state.index.map(s => (
                                                <div>
                                                    <button disabled={s.type} className="btn btn-outline-light text-dark" >{s.type}</button>
                                                </div>
                                            ))}
                                        </td>
                                        <td>
                                            {this.state.index.map(s => (
                                                <div>
                                                    {s.size == undefined ?
                                                        <></>
                                                        :
                                                        <button disabled={s.size} className="btn btn-outline-light text-dark">{s.size}kb</button>
                                                    }

                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Folder2;