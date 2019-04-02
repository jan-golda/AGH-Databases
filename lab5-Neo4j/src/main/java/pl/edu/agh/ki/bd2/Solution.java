package pl.edu.agh.ki.bd2;

import java.util.Date;

public class Solution {

    private final GraphDatabase graphDatabase = GraphDatabase.createDatabase();

    public void databaseStatistics() {
        System.out.println(graphDatabase.runCypher("CALL db.labels()"));
        System.out.println(graphDatabase.runCypher("CALL db.relationshipTypes()"));
    }

    public void runAllTests() {
        System.out.println(findActorByName("Emma Watson"));
        System.out.println(findMovieByTitleLike("Star Wars"));
        System.out.println(findRatedMoviesForUser("maheshksp"));
        System.out.println(findCommonMoviesForActors("Emma Watson", "Daniel Radcliffe"));
        System.out.println(findMovieRecommendationForUser("emileifrem"));
        System.out.println(createActor("TestActor"));
        System.out.println(createMovie("TestMovie"));
        System.out.println(addMovieForActor("TestActor", "TestMovie"));
        System.out.println(addActorDetails("TestActor", "nowhere", new Date().getTime() + ""));
        System.out.println(findActorsThatPlayedInAtLeastNMovies(6));
        System.out.println(getAverageMoviesPerActorThatPlayedInMoreThanNMovies(6));
        System.out.println(findActorsThatPlayedInAtLeastNMoviesAndDirectedMMovies(5, 1));
        System.out.println(findMoviesRatedByFriends("adilfulara", 3));
        System.out.println(pathsBetweenActorsExcludingMovies("Emma Watson", "Daniel Radcliffe"));
    }

    private String findActorByName(final String actorName) {
        return graphDatabase.runCypher(String.format(
                "MATCH (a:Actor) " +
                        "WHERE a.name=\"%s\" " +
                        "RETURN a",
                actorName
        ));
    }

    private String findMovieByTitleLike(final String movieName) {
        return graphDatabase.runCypher(String.format(
                "MATCH (m:Movie) " +
                        "WHERE m.title CONTAINS \"%s\" " +
                        "RETURN m.title AS movie",
                movieName
        ));
    }

    private String findRatedMoviesForUser(final String userLogin) {
        return graphDatabase.runCypher(String.format(
                "MATCH (u:User) -[r:RATED]-> (m:Movie) " +
                        "WHERE u.login=\"%s\" " +
                        "RETURN m.title AS movie, r.stars AS rating",
                userLogin
        ));
    }

    private String findCommonMoviesForActors(String actorOne, String actrorTwo) {
        return graphDatabase.runCypher(String.format(
                "MATCH (a1:Actor) -[:ACTS_IN]-> (m:Movie) <-[:ACTS_IN]- (a2:Actor) " +
                        "WHERE a1.name=\"%s\" AND a2.name=\"%s\" " +
                        "RETURN m.title AS movie",
                actorOne,
                actrorTwo
        ));
    }

    private String findMovieRecommendationForUser(final String userLogin) {
        return graphDatabase.runCypher(String.format(
                "MATCH (u:User) -[:FRIEND]- (:User) -[r:RATED]-> (m:Movie) " +
                        "WHERE u.login=\"%s\" AND r.stars > 3 " +
                        "RETURN m.title AS title, avg(r.stars) AS rating " +
                        "ORDER BY rating DESC",
                userLogin
        ));
    }

    private String createMovie(final String title) {
        return graphDatabase.runCypher(String.format(
                "CREATE (m:Movie {title: \"%s\"}) " +
                        "RETURN m",
                title
        ));
    }

    private String createActor(final String name) {
        return graphDatabase.runCypher(String.format(
                "CREATE (a:Actor {name: \"%s\"}) " +
                        "RETURN a",
                name
        ));
    }

    private String addMovieForActor(final String actor, final String movie) {
        return graphDatabase.runCypher(String.format(
                "MATCH (a:Actor),(m:Movie) " +
                        "WHERE a.name=\"%s\" AND m.title=\"%s\" " +
                        "CREATE (a) -[r:ACTS_IN]-> (m) " +
                        "RETURN r",
                actor,
                movie
        ));
    }

    private String addActorDetails(final String actor, final String birthplace, final String birthday){
        return graphDatabase.runCypher(String.format(
                "MATCH (a:Actor) " +
                        "WHERE a.name=\"%s\" " +
                        "SET a.birthplace=\"%s\", a.birthday=\"%s\" " +
                        "RETURN a",
                actor,
                birthplace,
                birthday
        ));
    }

    private String findActorsThatPlayedInAtLeastNMovies(final int n){
        return graphDatabase.runCypher(String.format(
                "MATCH (a:Actor) -[:ACTS_IN]-> (m:Movie) " +
                        "WITH a, size(collect(m)) AS movies " +
                        "WHERE movies >= %d " +
                        "RETURN a.name",
                n
        ));
    }

    private String getAverageMoviesPerActorThatPlayedInMoreThanNMovies(final int n){
        return graphDatabase.runCypher(String.format(
                "MATCH (a:Actor) -[:ACTS_IN]-> (m:Movie) " +
                        "WITH a, size(collect(m)) AS movies " +
                        "WHERE movies > %d " +
                        "RETURN avg(movies)",
                n
        ));
    }

    private String findActorsThatPlayedInAtLeastNMoviesAndDirectedMMovies(final int n, final int m){
        return graphDatabase.runCypher(String.format(
                "MATCH (m1:Movie) <-[:DIRECTED]- (a:Actor) -[:ACTS_IN]-> (m2:Movie) " +
                        "WITH a, size(collect(m2)) AS acted, size(collect(m1)) AS directed " +
                        "WHERE acted >= %d AND directed >= %d " +
                        "RETURN a.name AS actor " +
                        "ORDER BY acted",
                n,
                m
        ));
    }

    private String findMoviesRatedByFriends(final String user, final int stars){
        return graphDatabase.runCypher(String.format(
                "MATCH (u:User) -[:FRIEND]-> (f:User) -[r:RATED]-> (m:Movie) " +
                        "WHERE u.login=\"%s\" AND r.stars >= %d " +
                        "RETURN f.login AS friend, m.title AS movie, r.stars AS rating",
                user,
                stars
        ));
    }

    /**
     *  Ten przedmiot jest absurdalny, zadania nie doprecyzowane, prowadzacy maja wszystko gdzies... Zdecydowanie najgorszy na tych studiach.
     */

    private String pathsBetweenActorsExcludingMovies(final String actor1, final String actor2){
        return graphDatabase.runCypher(String.format(
                "MATCH p = ((a1:Actor) -- (a2:Actor)) " +
                        "WHERE a1.name=\"%s\" AND a2.name=\"%s\" AND none(n IN nodes(p) WHERE n:Movie) " +
                        "RETURN p",
                actor1,
                actor2
        ));
    }
}
