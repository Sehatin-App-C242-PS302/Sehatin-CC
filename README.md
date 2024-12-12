<h1><u>Sehatin: Health Journey Buddy App</u></h1>

By utilizing cloud computing technology, Sehatin can process user data faster and more accurately, perform more comprehensive food nutrition analysis, and provide more personalized and effective daily activity recommendations. Cloud computing services such as Google CloudSQL, Google Cloud Run, and Cloud Storage enable Sehatin to provide a better and more scalable user experience.

<h2><u>ML Model API Repository:</u></h2>
<li>https://github.com/Sehatin-App-C242-PS302/Sehatin-CC-DeployModel.git <li>
<li>https://github.com/Sehatin-App-C242-PS302/sehatin-cc-model1.git</li> 
<li>https://github.com/Sehatin-App-C242-PS302/Sehatin-CC-Deploy-Model2.git</li> 

<h1><u>System Architecture</u></h1>

<ul>
<li><b>Database:</b> MySQL on Google CloudSQL</li>
<li><b>Machine Learning Model Deployment and Integration:</b> Google Cloud Run based on Docker containers using Artifact Registry and Cloud Build images</li>
<li><b>API Framework:</b> FastAPI</li>
<li><b>Asynchronous Communication:</b> Cloud Pub/Sub</li>
<li><b>Image Storage:</b> Cloud Storage Buckets</li>
<li><b>Monitoring API:</b> Cloud Monitoring</li>
</ul>

<h1><u>System Components</u></h1>
<ol>
<li><b>User:</b> Mobile application used by users to access Sehatin services</li>
<li><b>API: </b>Application programming interface used to connect mobile applications with machine learning models</li>
<li><b>Machine Learning Model:</b> Model used to perform food nutrition analysis and provide daily activity recommendations</li>
<li><b>Database:</b> Storage place for user data and food nutrition analysis results</li>
<li><b>Cloud Storage:</b> Storage place for food images uploaded by users</li>
</ol>

<h1><u>Prerequisites</u></h1>
<ul>
<li><b>Google Cloud Platform :</b></li> Manage your computational settings.
<li><b>Postman :</b></li> For test the backend API.
</ul>

<h1><u>Installation and Configuration</u></h1>
<ol>
<li><b>Clone the repository:</b>
  <pre>https://github.com/Sehatin-App-C242-PS302/Sehatin-CC</pre></li>
<li><b>Create and activate virtual environment:</b>
<pre>python -m venv venv
source venv/bin/activate</pre>
<li><b>Install dependencies:</b></li>
<pre>pip install -r requirements.txt</pre>
<li><b>Run the app:</b></li>
<pre>npm start server.js</pre>
</ol>
