学过 JDBC 看这个，干净又卫生

对于最常用的 CRUD 主要分俩个大情况：

- 增删改
- 查

下面就详细说说

### update 语句

实际上，增删改都可以看作对数据的更改，于是就合并同类项到了 update 语句下

```java
    public void add(Student student) {
        //增删改大同小异，这里就只演示一种插入
        String sql ="insert into copy values(?,?)";
        Object[] args={student.getSid(),student.getSname()};
        int insert=jdbcTemplate.update(sql,args);
        System.out.println("修改了"+insert+"条结果");
    }
```

sql 变量中即是相关语句，可以说增删改也就这里不同了

**jdbcTemplate.update()** 方法的参数有两种：

1. sql 语句
2. 任意数量的参数（填充上面的 ？）

### queryForObject 与 query 语句

查被细分为了两种情况：

- 返回单个对象
- 返回集合

#### queryForObject

用于返回单个对象

```java
public int selectCount(){
    String sql="select count(*) from copy";
    int scount=jdbcTemplate.queryForObject(sql,Integer.class);
    return scount;
}

public Student findStu(String id){
    String sql="select * from copy where Sid=?";
    Student stu=jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<Student>(Student.class),id);
    return stu;
}
```

当返回一个整数或其它单属性时，可以用 **sql 语句 + 类型+参数（此处省略）** 获得值

当返回一个对象时，一定要提前构造好相应类型（尤其是对应变量的 set 方法），使用 **sql 语句 + BeanPropertyRowMapper\<相应类型\>(相应类型.class) + 参数**

#### query

用于返回对象集合

```java
public List<Student> findAllStu() {
    String sql="select * from copy order by sname";
    List<Student> ls=jdbcTemplate.query(sql, new BeanPropertyRowMapper<Student>(Student.class));
    return ls;
}
```

看起来和返回复杂对象相似，只不过改用了 query。

这可比单纯 JDBC 好用多了啊

### 批量操作 batchUpdate

与之前不同，使用批量操作可以一次性操作多条数据

```java
public void insertAllStu(List<Object[]> ol) {
    String sql="insert into copy values(?,?)";
    int[] i=jdbcTemplate.batchUpdate(sql,ol);
    System.out.println(Arrays.toString(i));
}
```

可以看到传入 batchUpdate 方法的有两个参数：一个仍然是 sql 语句，另一个则是 Object 数组的集合，实际上，batchUpdate 方法从集合中每个 Object 数组中获取子元素并加入到数据库中

**同理，修改与删除应该也相当容易了**

下一次整事务操作