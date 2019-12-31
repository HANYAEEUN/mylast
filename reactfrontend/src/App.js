import React from 'react';
import './App.css';
import api from './api';
import PostView from './Components/PostView'
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



class App extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            results: [],
        }
    }
    
    componentDidMount() {
    this.getPosts()
        
    }   
    
    async getPosts() {
     const _results = await api.getAllPosts()
       console.log(_results)  
      this.setState({results: _results.data})
        
    }
       
    
    handlingChange = (event) => {
        this.setState({[event.target.name]: event.target.value})   
        
    }
    
    handlingSubmit = async (event) => {
        event.preventDefault()
        let result = await api.createPost({title: this.state.title, content: this.state.content})
        console.log("완료됨!", result)
        this.setState({title:'', content:''})
        this.getPosts()
    }
    
    
    handlingDelete = async (event)=> {
        await api.deletePost(event.target.value)
        this.getPosts()
        
    }
    
    render() {   
    return (
    <div className="App">
            <Container maxWidth="lg"> 
        <div className="PostingSection">
            <paper className="PostingForm">
          <h2> 임금님 귀는 당나귀 귀</h2>
        
            
            <form className="PostingSet" onSubmit={this.handlingSubmit}>
                
                 <TextField
          id="outlined-multiline-flexible"
          label="title"
          name="title"
          multiline
          rowsMax="4"
          value={this.state.title}
          onChange={this.handlingChange}
          variant="outlined"
        />
          

                <TextField
          id="filled-multiline-static"
          label="content"
          name="content"
          multiline
          rows="4"
          value={this.state.content}
          onChange={this.handlingChange}
          variant="outlined"
        />
             
    
                <Button variant="outlined" type="submit">소문내기</Button>
                </form>
                
            </paper>
          </div>
        <div className="ViewSection">
            {
                this.state.results.map((post) =>
                <div>
               <PostView key={post.id} id={post.id} title={post.title} content={post.content}/>
               <button value={post.id} onClick={this.handlingDelete}>소문취소</button> </div>)
               
                
            }
            
          </div>
            </Container>
    </div>
  );      
 }
}

export default App;

