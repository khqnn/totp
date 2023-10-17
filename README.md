# totp
Time based One Time Password

- Basic implementation of TOTP in Python and Node
- secure communication between client and server application
- must be used if there is a risk that the backend could expose to vulnurabilities
- if the backend api is exposed and want to prevent unwanted call from other clients then API key won't work
- only applicable if there's no process of authentication or authorization and apis could expose
- frontend application will call backend with one time password which can be authenticated by server


run  
```python totp_algo.py```  
```node totp_algo.js```

