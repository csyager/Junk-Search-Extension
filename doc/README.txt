Junk Search Extension
Version 1.0


CONTENTS OF THIS FILE
—————————————————————-
* Introduction
* Prerequisites
* Meta-SQL Statements
* Scripts
* Tables
* Contributing
* License

INTRODUCTION
————————————
This extension file contains the JunkSearch Tool.  The tool works by taking user input for an email pattern (regex), date created, and owner username, and queries contacts stored in the cntct table if “Query Contacts” is clicked, and the newly created marked_for_followup table (also included in this extension) if “Query Marked for Review” is clicked.  Once the results list is populated, the various function buttons can be utilized.  Marking a contact for review moves it to the marked_for_followup table. Deleting a contact removes several primary key restrictions by updating restricting columns in other tables and moves the contact from the cntct table and into the temp_junk table (also included in this extension).  By utilizing this tool, all accounts with junk email addresses (for example, ending in “@mailinator.com”) could be eliminated in bulk, freeing up space on the database.

This extension is not perfect, with several issues outlined in the “Contributing” section.  
Perhaps most important is that several changes to the database that this tool makes are irreversible, and CANNOT be undone.  While the temp_junk table (described below) does mitigate some risk, caution should be used when using this tool to avoid deleting data that cannot be recovered.  

PREREQUISITES
—————————————

This tool is fashioned entirely based on the database framework used at xTuple.  In order for this extension to be useable out of the box, the user’s database must mirror xTuple’s exactly in terms of primary keys and table naming.  However, the framework used here could be modified or expanded upon to serve whatever needs the user may have.
META-SQL STATEMENTS
————————————————————

* deleteAll :  Moves all contacts displayed on interface into the temp_junk table (included in this extension) from the cntct table.  The xTuple database uses primary keys in several tables that restrict removing contacts from the cntct table, so the crmacct, incdt, custinfo, prj, and ophead tables are updated to set the cntct_id column in any corresponding rows to NULL.  While the temp_junk table will store cntct information until the finalize meta-SQL statement is called, and therefore cntct information could be restored by using an SQL query on the database, these changes in other tables are not tracked and therefore CANNOT be restored.

* deleteAllMarked :  Removes all contacts that match the search query from the marked_for_followup table.  This has no effect on the cntct table.

* deleteSelected :  Moves an individual contact from the cntct table into the temp_junk table.  This function is repeated for all selected contacts.  This is done using the same functions as the deleteAll function, so be careful doing this.

* deleteSelectedMarked :  Removes an individual contact from the marked_for_followup table, and is repeated for all selected contacts.  This has no effect on the cntct table.

* finalize :  Removes all contacts from the temp_junk table.  This CANNOT be undone.  Also, it is important to note that the temp_junk table may still contain contacts from previous uses of this tool, and those will be deleted as well, so be careful using this function.

* junkSearch :  Queries the cntct table based on the search criteria provided by the UI.

* markAllForReview :  Copies all contacts matching the search criteria from the cntct table into the marked_for_followup table.

* markOneForReview :  Copies a single contact from the cntct table into the marked_for_followup table.  This is repeated for all selected contacts.

* queryMarked :  Queries the marked_for_followup table based on the search criteria provided.

SCRIPTS
———————

* junkSearch.js :  Javascript file to create the Junk Search Tool.  Functions are listed below:

	* toggle() :  called when the “Include Ownerless Contacts” checkbox is clicked.  	Changes value of checked between true and false.
	* getParams() :  Takes user input from the search criteria and stores it in an 		object called “params,” to be later passed to the meta-SQL files.
	* query() :  Called when the “Query Contacts” button is clicked.  Calls the 		junkSearch meta-SQL statement and populates the list with the results.
	* reviewAll() :  Called when the “Mark All For Review” button is clicked.  Calls 	markAllForReview meta-SQL statement to copy all contacts shown into the 		marked_for_followup table.
	* queryMarked() :  Called when the “Query Marked For Review” button is clicked.  	Calls the queryMarked meta-SQL statement and populates the list with the results.
	* reviewSelected() :  Called when the “Mark Selected For Review” button is 		clicked.  Calls the markOneForReview meta-SQL statement for each selected contact.
	* deleteAll() : Called when the “Delete All” button is clicked.  If the UI is in 	the cntctView (Query Contacts was most recently clicked), calls deleteAll meta-SQL 	to delete all contacts from cntct that are in the list.  If not in cntctView 		(Query Marked For Review was most recently clicked), calls deleteAllMarked meta-	SQL to delete all contacts in the marked_for_followup table that are on the list.
	* deleteSelected() :  Called when the “Delete Selected” button is clicked.  Calls 	either deleteSelected or deleteSelectedMarked, depending on which view the UI is 	in.  This loops through the selected contacts to delete them one at a time.
	* finalize() : Called when the “Finalize” button is clicked.  Calls the finalize 	meta-SQL to delete all contacts from the temp_junk folder.

TABLES
——————

* marked_for_followup :  This table stores all information stored by the cntct table, and is used to store copies of contacts in the cntct table that have been marked for review before being deleted.

* temp_junk :  This table stores all information stored by the cntct table, and is used to store contacts from the cntct table that have been deleted.  This is intended as a safeguard to prevent deleting all contact data permanently.  These files can be restored by editing the database directly with SQL queries.  It can be emptied using the finalize function, which will irreversibly delete the contacts.


CONTRIBUTING
————————————

One large hinderance that this tool has is the irreversibility of some of its functions.  A single button click could drastically alter stored data.  An undo function was attempted, but due to restrictions caused by primary keys in other tables, this feature was ultimately stricken from Version 1.0 in favor of the “finalize” function and temp_junk table.  In future updates this fix would increase usability and decrease risk of accidentally removing a file.

A more simple fix that would also help combat the problem described above would be to add a pop-up window that prompts the user to confirm that they do want to remove the selected contacts from their database.

In some places the code for this is rather messy and could in all likelihood be optimized to increase speed as well as make contribution to the code easier.

LICENSE
———————

Copyright (c) 2018 Connor Yager

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
OR OTHER DEALINGS IN THE SOFTWARE.