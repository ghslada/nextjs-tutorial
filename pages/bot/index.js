import { Configuration, OpenAIApi } from "openai";
import { useEffect, useState } from "react";

const configuration = new Configuration({
    // organization: "org-DmPkVT4SLwXqCvsnEolbq48v",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default function CarsList ({engines}) {  

    const [params, setParams] = useState({
        input: '',
        instruction: '',
        model: 'text-davinci-edit-001'
    });
    const [response, setResponse] = useState('');

    useEffect( () => {
        console.log(params);
    },[params]);

    function handleParamsChange(event) {
        const name=event.target.name;
        const value=event.target.value;
        setParams({...params, [name] : value});
    }

    async function sendEdit () {

        var myHeaders = new Headers();

        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer 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');

        var myInit = { 
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(params)
        };

        const response = await fetch('https://api.openai.com/v1/edits', myInit);
        const res = await response.json();
        console.log(JSON.stringify(res));
        const data = res.choices[0].text.replace(params.input,'');
        setResponse(res.choices[0].text);
    }

    return(
    <div>

        <h1>Ask for an AI help!</h1>

        {/* <div>

            <input id="edits" type="checkbox" defaultChecked={false}/>
            <label htmlFor="edits">Edits</label>
            <input id="completetions" type="checkbox" defaultChecked={false}/>
            <label htmlFor="completetions">Completetions</label>

        </div>

        <ul>
            {engines.map( engine => {
                console.log();
                return(
                    <li>
                        <a 
                        href={"http://localhost:3000/bot/"+engine.id}
                        >{engine.id}</a>

                    </li>
                )
            })}
        </ul>     */}

        <div>
        
            <textarea name="input" onChange={handleParamsChange} id="input" type="text" value={params.input} placeholder="Input something..."/>
            <textarea name="instruction" onChange={handleParamsChange} style={{"min-width": "20%"}} value={params.instruction} placeholder="Instructions of what to do with the input" />
            <input type="hidden" value={params.model} placeholder="BOT ID"/>

        </div>
        <br/>
        <button onClick={sendEdit}>Send params</button>
        <div>
            <h1>AI response: </h1>
            <pre>
                {response}
            </pre>
        </div>

    </div>);

}

export async function getStaticProps({params}) {

    const response = await openai.listEngines();

    const enginesList = response.data;

    // console.log(enginesList);

    const choosedEngines = enginesList.data.filter( engine => {

        if ( engine.id.includes('text-davinci') && engine.id.includes('001') ) {
            
            return engine;

        }

    });

    console.log(choosedEngines);

    return {
      props : {

        // manufacturers: data,
        engines: choosedEngines

      }
    }

}