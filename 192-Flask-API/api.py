""" 
---LICENSE---
Author: John Matthew L. Villaluz
This is a course requirement for CS 192
Software Engineering II under the
supervision of Asst. Prof. Ma. Rowena C.
Solamo of the Department of Computer
Science, College of Engineering, University
of the Philippines, Diliman for the AY 2019-
2020.

---HISTORY---
1/20/20 John Matthew L. Villaluz - Created file
                                 - Made Models and Routing
1/30/20 John Matthew L. Villaluz - Added get_eatery endpoint
                                 - Added Documentation
2/9/20 John Matthew L. Villaluz - Optmized queries
                                - Added delete_eatery, update_eatery, flag_eatery,      unflag_eatery, delete_review, flag_review,            unflag_review
                                - Added Documentation
2/12/20 John Matthew L. Villaluz - Fixed bug related to the flagged reviews's ratings
                                   being reflected in the eatery rating
                                 - Added Documentation

---ABOUT---
Created: 1/20/20
Dev Group: RUPE Group 1
Client: Rowena Solamo
Desc: This contains relevant code for the API of RUPE. It has the 
Models and Routing of the backend.
"""

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow 
from flask_cors import CORS, cross_origin
import os 

# File Initializations
app = Flask(__name__) # creates the flask app 
CORS(app) # enables cross origin resource sharing
basedir = os.path.abspath(os.path.dirname(__file__)) # sets up the path for the sqlite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite') # configures sqlite database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # removes sqlite warnings

db = SQLAlchemy(app) # creates database object
ma = Marshmallow(app) # creates schema object

# Database Models
class Eatery(db.Model):
     id = db.Column(db.Integer, primary_key=True) # primary key of the eatery table
     name = db.Column(db.String(256), nullable=False) # name of the eatery
     address = db.Column(db.String(256), nullable=False, default='Unknown') # address of the eatery
     contact = db.Column(db.String(20), nullable=False, default='Unknown') # contact number of the eatery
     why_flag = db.Column(db.Text, default='') # reason for why the eatery was flagged
     flag = db.Column(db.Boolean, nullable=False, default=False) # whether or not the eatery is flagged
     rating = db.Column(db.Float, nullable=False, default=0) # overall rating of the eatery
     reviews = db.relationship('Review', backref='eatery', lazy=True) # database relationship of eatery and review

     """
     Method Name: __init__
     Creation: 1/20/20
     Purpose: to make the creating eatery objects easier
     Arguments: self, name, address, contact
     Required Tables: eatery
     Return Value: none
     """
     def __init__(self, name, address, contact):
          self.name = name # set passed name to the object's name
          self.address = address # set passed address to the object's address
          self.contact = contact # set passed contact to the object's contact

     """
     Method Name: __repr__
     Creation: 1/20/20
     Purpose: for displaying in terminal
     Arguments: self
     Required Tables: eatery
     Return Value: string containing the id
     """
     def __repr__(self):
          return 'Eatery ' + str(self.id)

class Review(db.Model):
     id = db.Column(db.Integer, primary_key=True) # primary key of the review table
     review_text = db.Column(db.Text, nullable=False, default='') # review of an eatery
     rating = db.Column(db.Float, nullable=False, default=0) # rating of an eatery
     why_flag = db.Column(db.Text, default='') # reason for why the review was flagged
     flag = db.Column(db.Boolean, nullable=False, default=False) # whether or not the review is flagged
     flagged_before = db.Column(db.Boolean, nullable=False, default=False) # whether or not the review has been flagged before
     eatery_id = db.Column(db.Integer, db.ForeignKey('eatery.id'), nullable=False) # foreign key of review to eatery

     """
     Method Name: __init__
     Creation: 1/20/20
     Purpose: to make creating review objects easier
     Arguments: self, review_text, rating, eatery_id
     Required Tables: review
     Return Value: none
     """
     def __init__(self, review_text, rating, eatery_id):
          self.review_text = review_text # set passed review_text to object's review_text
          self.rating = rating # set passed rating to object's rating
          self.eatery_id = eatery_id # set passed eatery_id to object's eatery_id

     """
     Method Name: __repr__
     Creation: 1/20/20
     Purpose: for displaying in terminal
     Arguments: self 
     Required Tables: review
     Return Value: string containing the id
     """
     def __repr__(self): 
          return 'Review ' + str(self.id)

# Schema For Sending Json Data
class EaterySchema(ma.Schema):
     class Meta: 
          fields = ('id', 'name', 'address', 'contact', 'why_flag', 'flag', 'rating') # format of json data for eateries

class ReviewSchema(ma.Schema):
     class Meta:
          fields = ('id', 'review_text', 'rating', 'why_flag', 'flag', 'flagged_before', 'eatery_id') # format of json data for reviews

eatery_schema = EaterySchema() # holds the schema structure for a single eatery
eateries_schema = EaterySchema(many=True) # holds the schema structure for multiple eateries
review_schema = ReviewSchema() # holds the schema structure for a single review
reviews_schema = ReviewSchema(many=True) # holds the schema structure for multiple reviews

# Endpoints for Eatery Related Data
"""
Method Name: get_eatery
Creation: 1/30/20
Purpose http get request for a single eatery 
Arguments: id 
Required Tables: eatery 
Return Value: single eatery in json format 
"""
@app.route('/eatery/<int:id>', methods=['GET'])
def get_eatery(id):
     eatery = Eatery.query.get(id) # query eatery with an id of id

     return eatery_schema.jsonify(eatery)	 

"""
Method Name: get_eateries
Creation: 1/20/20
Purpose: http get request for all eateries
Arguments: none
Required Tables: eatery
Return Value: all eateries in json format
"""
@app.route('/eatery', methods=['GET'])
def get_eateries():
     eateries = Eatery.query.all() # query all eateries

     return eateries_schema.jsonify(eateries)

"""
Method Name: add_eatery
Creation: 1/20/20
Purpose: http post request to add an eatery
Arguments: none
Required Tables: eatery
Return Value: added eatery in json format
"""
@app.route('/eatery/add', methods=['POST'])
def add_eatery():
     name = request.get_json(force=True)['name'] # get name from POST request
     address = request.get_json(force=True)['address'] # get address from POST request
     contact = request.get_json(force=True)['contact'] # get contact from POST request

     new_eatery = Eatery(name, address, contact) # create new eatery object

     db.session.add(new_eatery) # add new eatery to the database
     db.session.commit() # save the change to the database

     return eatery_schema.jsonify(new_eatery)

"""
Method Name: delete_eatery
Creation: 2/9/20
Purpose: http delete request to remove an eatery
Arguments: id
Required Tables: eatery
Return Value: deleted eatery in json format
"""
@app.route('/eatery/<int:id>/delete', methods=['DELETE'])
def delete_eatery(id):
     eatery = Eatery.query.get(id) # query eatery to be deleted

     for review in eatery.reviews: # iterate through every review of eatery
          db.session.delete(review) # delete each review
     db.session.delete(eatery) # delete eatery
     db.session.commit() # save changes to the database

     return eatery_schema.jsonify(eatery)

"""
Method Name: update_eatery
Creation: 2/9/20
Purpose: http put request to change an eatery
Arguments: id
Required Tables: eatery
Return Value: updated eatery in json format
"""
@app.route('/eatery/<int:id>/update', methods=['PUT'])
def update_eatery(id):
     eatery = Eatery.query.get(id) # query eatery to be updated

     eatery.name = request.get_json(force=True)['name'] # get name from PUT request
     eatery.address = request.get_json(force=True)['address'] # get address from PUT request
     eatery.contact = request.get_json(force=True)['contact'] # get contact from PUT request

     db.session.commit() # save changes to the database

     return eatery_schema.jsonify(eatery)

"""
Method Name: flag_eatery
Creation: 2/9/20
Purpose: http put request to flag an eatery
Arguments: id
Required Tables: eatery
Return Value: flagged eatery in json format
"""
@app.route('/eatery/<int:id>/flag', methods=['PUT'])
def flag_eatery(id):
     eatery = Eatery.query.get(id) # query eatery to be flagged

     eatery.flag = True # set flag to true
     eatery.why_flag = request.get_json(force=True)['why_flag'] # get why_flag from PUT request

     db.session.commit() # save changes to the database

     return eatery_schema.jsonify(eatery)

"""
Method Name: unflag_eatery
Creation: 2/9/20
Purpose: http put request to unflag an eatery
Arguments: id
Required Tables: eatery
Return Value: unflagged eatery in json format
"""
@app.route('/eatery/<int:id>/unflag', methods=['PUT'])
def unflag_eatery(id):
     eatery = Eatery.query.get(id) # query eatery to be unflagged

     eatery.flag = False # set flag to false
     eatery.why_flag = '' # clear why_flag 
    
     db.session.commit() # save changes to the database

     return eatery_schema.jsonify(eatery)

# Endpoints For Review Related Data
"""
Method Name: get_reviews
Creation: 1/20/20
Purpose: http get request for all reviews of an eatery 
Arguments: id 
Required Tables: eatery
Return Value: all reviews of an eatery in json format
"""
@app.route('/eatery/<int:id>/review', methods=['GET'])
def get_reviews(id):
     reviews = Eatery.query.get(id).reviews # query all reviews from the eatery with an id of id
     
     return reviews_schema.jsonify(reviews)

"""
Method Name: add_review
Creation: 1/20/20
Purpose: http post request to add a review to an eatery
Arguments: id
Required Tables: eatery, review
Return Value: added review in json format
"""
@app.route('/eatery/<int:id>/review/add', methods=['POST'])
def add_review(id):
     eatery = Eatery.query.get(id) # query eatery with id of id

     review_text = request.get_json(force=True)['review_text'] # get review_text from POST request
     rating = request.get_json(force=True)['rating'] # get rating from POST request

     if eatery.rating == 0: # set rating to the rating of the only review
          eatery.rating = rating
     else: # base rating on unflagged reviews
          total = rating # total ratings of unflagged reviews (including unadded review)
          count = 1 # number of unflagged reviews (including unadded review)

          for rev in eatery.reviews: # iterate through list of reviews
               if rev.flag == False: #ignore flagged reviews
                    total += rev.rating 
                    count += 1
          
          eatery.rating = total / count

     new_review = Review(review_text, rating, id) # create new review object

     db.session.add(new_review) # add new review to the database
     db.session.commit() # save the change to the database

     return review_schema.jsonify(new_review)

"""
Method Name: delete_review
Creation: 2/9/20
Purpose: http post request to delete a review from an eatery
Arguments: e_id, r_id
Required Tables: eatery, review
Return Value: deleted review in json format
"""
@app.route('/eatery/<int:e_id>/review/<int:r_id>/delete', methods=['DELETE'])
def delete_review(e_id, r_id):
     eatery = Eatery.query.get(e_id) # query eatery of the review
     review = Review.query.get(r_id) # query review to be deleted

     if len(eatery.reviews) == 1: # set rating to 0 when removing the last review
          eatery.rating = 0
     else: # base rating on remaining unflagged reviews
          total = 0 # total rating of unflagged reviews
          count = 0 # number of unflagged reviews

          for rev in eatery.reviews: # iterate through list of reviews 
               if rev.flag == False and rev.id != r_id: # ignore flagged and to be deleted reviews
                    total += rev.rating
                    count += 1

          eatery.rating = total / count # set rating to average of unflagged reviews

     db.session.delete(review) # delete review
     db.session.commit() # save changes to the database
 
     return review_schema.jsonify(review)

"""
Method Name: flag_review
Creation: 2/9/20
Purpose: http put request to flag a review from an eatery
Arguments: e_id, r_id
Required Tables: eatery, review
Return Value: flagged review in json format
"""
@app.route('/eatery/<int:e_id>/review/<int:r_id>/flag', methods=['PUT'])
def flag_review(e_id, r_id):
     eatery = Eatery.query.get(e_id) # query eatery of the review
     review = Review.query.get(r_id) # query review to be flagged
 
     review.flag = True # set flag to true
     review.flagged_before = True # set flagged_before to true
     review.why_flag = request.get_json(force=True)['why_flag'] # get why_flag from PUT request

     total = 0 # total ratings of unflagged reviews
     count = 0 # number of unflagged reviews

     for rev in eatery.reviews: # iterate through list of reviews
          if rev.flag == False: #ignore flagged reviews
               total += rev.rating
               count += 1
 
     if count == 0: # set rating to 0 for 0 unflagged reviews
          eatery.rating = 0
     else: # set rating to average of unflagged reviews
          eatery.rating = total / count

     db.session.commit() # save changes to the database
 
     return review_schema.jsonify(review)

"""
Method Name: unflag_review
Creation: 2/9/20
Purpose: http put request to unflag a review from an eatery
Arguments: e_id, r_id
Required Tables: eatery, review
Return Value: unflagged review in json format
"""
@app.route('/eatery/<int:e_id>/review/<int:r_id>/unflag', methods=['PUT'])
def unflag_review(e_id, r_id):
     eatery = Eatery.query.get(e_id) # query eatery of the review
     review = Review.query.get(r_id) # query review to be unflagged

     review.flag = False # set flag to false
     review.why_flag = '' # clear why_flag

     if eatery.rating == 0:
          eatery.rating = review.rating
     else:
          total = 0 # total rating of unflagged reviews
          count = 0 # number of unflagged reviews

          for rev in eatery.reviews: # iterate through list of reviews
               if rev.flag == False: # ignore flagged reviews
                    total += rev.rating
                    count += 1
     
          eatery.rating = total / count # set rating to average of unflagged reviews

     db.session.commit() #save changes to the database

     return review_schema.jsonify(review)

if __name__ == '__main__':
     app.run(debug=True)
