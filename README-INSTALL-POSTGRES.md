Copied from https://isabicode.wordpress.com/2020/12/21/setup-and-run-postgresql-on-your-smartphone/

First, let’s make sure Postgresql is installed on Termux. Execute the command below in the terminal:

```pkg install postgresql```
After installing, you must setup Postgresql by executing the commands below:

```
mkdir -p $PREFIX/var/lib/postgresql
initdb $PREFIX/var/lib/postgresql
```
With that done, you have everything setup already.

Now lets start the postgresql server:

```
pg_ctl -D $PREFIX/var/lib/postgresql start
```
Our server starts, but there is a problem, I’m guessing you figured it out already, the command above is too long. Imagine typing this command every time you have to start your server. So what do you think we can do about this, hmmm, I’m thinking aliases, yes, aliases.

Navigate to your Home directory on the terminal:

```
cd ~/
```
Open your .bash_aliases file with nano(you can also use vim):

```
nano .bash_aliases
```

Add the following lines to the file:

```
alias pgstart="pg_ctl -D $PREFIX/var/lib/postgresql start"
alias pgstop="pg_ctl -D $PREFIX/var/lib/postgresql stop"
```
You can change “pgstart” and “pgstop” to any name you like, It’s what you will type when you want to start or stop the postgresql server.

After adding the lines, press Ctrl-O on you keyboard to write out to the file, Enter to confirm the name and save, then Ctrl-X to exit.

Before our aliases can work, we have to refresh the .bash_aliases file. Enter the command below to refresh it.

```
source ~/.bash_aliases
```
Now you can test out the aliases we made by typing the start alias you configured earlier and the stop alias to see if they are working as they should.

We are now done with how to start and stop our postgresql server, let’s now move on to connecting to the server and creating a sample database.

Let’s first get a list of databases that comes with the installation on the server. Enter the command:

```
psql -l
```

To create your own database, simply enter the command:

```
psal -d postgres
create database microresearch;
create user microresearchadmin with encrypted password 'microresearchadmin';
grant all privileges on database microresearch to microresearchadmin;
```
“mydb” is the name I chose for my database.

To connect it, I’ll type:
```
psql micro-research
```
If the command executes successfully, it will show the prompt:

```
micro-research=#
```

Create the database, user and schema
```
sudo -u postgres psql


CREATE USER postgres WITH SUPERUSER WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE "micro-research" TO postgres;
psql -h localhost -p 5432 -d micro-research -U postgres
ALTER USER postgres WITH SUPERUSER;
GRANT CREATE ON DATABASE "micro-research" TO postgres;
CREATE SCHEMA app;
ALTER SCHEMA app OWNER TO postgres;


```
